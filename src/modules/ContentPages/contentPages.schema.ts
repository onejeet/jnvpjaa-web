import { z } from 'zod';
import type { ContentPageType } from './contentPages.registry';

// Mirrors the backend's src/services/contentPages/schema.ts (the backend also sanitises rich text).
const short = (max = 200) => z.string().trim().max(max, `Use ${max} characters or fewer`);
const required = (max = 200) => short(max).min(1, 'Required');
const richText = (min = 1) =>
  z
    .string()
    .max(100_000, 'This text is too long')
    .refine((html) => min === 0 || html.replace(/<[^>]+>/g, '').trim().length > 0, 'Required');
const image = z
  .object({
    url: z.string().max(500).url('Use a full image link').startsWith('https://', 'Use an https:// image'),
    alt: required(),
  })
  .strict();

const message = z
  .object({
    heading: required(),
    tagline: short().optional(),
    body: richText(),
    photo: image.optional(),
    signerName: short().optional(),
    signerRole: short().optional(),
  })
  .strict();

const text = z
  .object({
    heading: required(),
    sections: z
      .array(z.object({ heading: short().optional(), body: richText(), image: image.optional() }).strict())
      .min(1, 'Add at least one section')
      .max(12, 'Use 12 sections or fewer'),
  })
  .strict();

const peopleList = z
  .object({
    heading: required(),
    intro: richText(0).optional(),
    groups: z
      .array(
        z
          .object({
            key: z.string().regex(/^[a-z0-9-]{1,40}$/),
            label: required(100),
            visible: z.boolean(),
            emptyText: short().optional(),
          })
          .strict()
      )
      .min(1)
      .max(10),
    people: z
      .array(
        z
          .object({
            name: required(),
            group: z.string(),
            photo: image.optional(),
            batch: z.number().int().min(1980).max(2100).optional(),
            tenure: short(100).optional(),
            note: short(500).optional(),
          })
          .strict()
      )
      .max(200, 'Use 200 people or fewer'),
  })
  .strict()
  .superRefine((value, ctx) => {
    const keys = new Set(value.groups.map((group) => group.key));
    value.people.forEach((person, index) => {
      if (!keys.has(person.group)) {
        ctx.addIssue({ code: 'custom', path: ['people', index, 'group'], message: 'Unknown group' });
      }
    });
  });

const SCHEMAS = { message, text, 'people-list': peopleList };

export type ContentImage = z.infer<typeof image>;
export type MessageFields = z.infer<typeof message>;
export type TextFields = z.infer<typeof text>;
export type TextSection = TextFields['sections'][number];
export type PeopleListFields = z.infer<typeof peopleList>;
export type PeopleGroup = PeopleListFields['groups'][number];
export type Person = PeopleListFields['people'][number];
export type ContentFields = MessageFields | TextFields | PeopleListFields;

export const contentFieldsSchema = (type: ContentPageType) => SCHEMAS[type];
