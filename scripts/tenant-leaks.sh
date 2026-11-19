#!/usr/bin/env bash
# Builds web and backend for the demo tenant and fails if any JNVPJAA string reaches the shipped output.
# Usage: npm run tenant:leaks [-- path-to-backend]   (default ../jnvpjaa-backend)
set -euo pipefail
WEB="$(cd "$(dirname "$0")/.." && pwd)"
BACKEND="$(cd "${1:-$WEB/../jnvpjaa-backend}" && pwd)"
WEB_OUT=.next-leaks
BACKEND_OUT="$(mktemp -d)"
SW_BACKUP="$(mktemp -d)"

cd "$WEB"
# The PWA build rewrites the tracked service-worker files; put them back afterwards, and restore the local tenant's assets.
cp public/sw.js public/workbox-*.js "$SW_BACKUP"/ 2>/dev/null || true
restore() {
  cd "$WEB"
  rm -f public/workbox-*.js
  cp "$SW_BACKUP"/* public/ 2>/dev/null || true
  node scripts/tenant-assets.js >/dev/null 2>&1 || true
  rm -rf "$BACKEND_OUT" "$SW_BACKUP"
}
trap restore EXIT

TENANT=demo node scripts/tenant-assets.js
TENANT=demo NEXT_DIST_DIR="$WEB_OUT" NEXT_PUBLIC_NODE_ENV=production npx next build >"$WEB_OUT.log" 2>&1 ||
  { tail -30 "$WEB_OUT.log"; echo "web build failed (full log: $WEB_OUT.log)"; exit 1; }

(cd "$BACKEND" && TENANT=demo npx webpack --config webpack.config.js --output-path "$BACKEND_OUT" >/dev/null) ||
  { echo "backend build failed"; exit 1; }

# Ignore the build machine's own paths (the checkout folder may be named after the brand) and match "JNV" only as a word,
# so base64 data and hashes don't count.
hits="$(
  ROOT="$(dirname "$WEB")" DIRS="$(basename "$WEB") $(basename "$BACKEND")" perl -e '
    use File::Find;
    my $root = $ENV{ROOT};
    my @dirs = split / /, $ENV{DIRS};
    find({ no_chdir => 1, wanted => sub {
      return unless -f $_;
      open(my $fh, "<", $_) or return; local $/; my $s = <$fh>; close $fh;
      $s =~ s/\Q$root\E//g;
      $s =~ s{/\Q$_\E/}{/}g for @dirs;
      (my $enc = $root) =~ s{/}{%2F}g;
      $s =~ s/\Q$enc\E//g;
      $s =~ s{%2F\Q$_\E%2F}{%2F}g for @dirs;
      my @m;
      while ($s =~ /(.{0,40}(?:jnvpjaa|navodaya|paota|(?<![A-Za-z0-9+\/])JNV(?![A-Za-z0-9+\/])).{0,40})/gi) {
        my $hit = $1;
        next if $hit =~ /[A-Za-z0-9+\/]{60}/;
        push @m, $hit; last if @m >= 3;
      }
      print "$_\n", map({ "      $_\n" } @m) if @m;
    }}, @ARGV);
  ' "$WEB_OUT/static" "$WEB_OUT/server" "$BACKEND_OUT"
)"
if [ -n "$hits" ]; then
  echo "JNVPJAA strings found in demo build output:"
  echo "$hits"
  exit 1
fi
echo "tenant:leaks ok — 0 hits in demo web and backend builds"
