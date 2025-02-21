import { Box, Typography, Grid2 as Grid, Card, CardContent, CardMedia } from '@mui/material';

const blogPosts = [
  {
    title: 'The Future of Web Development',
    excerpt: 'Exploring upcoming trends and technologies in web development...',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    title: 'Mastering React Hooks',
    excerpt: 'A deep dive into React Hooks and how to use them effectively...',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    title: 'Building Scalable Backend Systems',
    excerpt: 'Best practices for creating robust and scalable backend architectures...',
    image: '/placeholder.svg?height=200&width=300',
  },
];

export default function BlogsSection() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Blog Posts
      </Typography>
      <Grid container spacing={3}>
        <Typography my={3} color="grey.500">
          Coming soon
        </Typography>
        {/* {blogPosts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia component="img" height="140" image={post.image} alt={post.title} />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.excerpt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))} */}
      </Grid>
    </Box>
  );
}
