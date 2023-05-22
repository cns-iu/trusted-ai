import { Meta, StoryFn } from '@storybook/angular';

import { OccupationsListingsComponent } from './occupations-listings.component';

export default {
  title: 'OccupationsListingsComponent',
  component: OccupationsListingsComponent,
} as Meta<OccupationsListingsComponent>;

const Template: StoryFn<OccupationsListingsComponent> = (args: OccupationsListingsComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  allJobs: [
    {
      title: 'Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors',
      preparation: 4,
      code: '13-2011.00',
    },
    {
      title: 'Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors',
      preparation: 4,
      code: '13-2011.00',
    },
    {
      title: 'Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors',
      preparation: 4,
      code: '13-2011.00',
    },
    {
      title: 'Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors',
      preparation: 4,
      code: '13-2011.00',
    },
    {
      title: 'Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors',
      preparation: 4,
      code: '13-2011.00',
    },
  ],
};
