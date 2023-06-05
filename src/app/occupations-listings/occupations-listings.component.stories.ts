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
      Occupation: 'Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors',
      'Job Zone': '4',
      'Data-level': 'Y',
      Code: '13-2011.00',
    },
    {
      Occupation: 'Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors',
      'Job Zone': '4',
      'Data-level': 'Y',
      Code: '13-2011.00',
    },
    {
      Occupation: 'Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors',
      'Job Zone': '4',
      'Data-level': 'Y',
      Code: '13-2011.00',
    },
    {
      Occupation: 'Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors',
      'Job Zone': '4',
      'Data-level': 'Y',
      Code: '13-2011.00',
    },
    {
      Occupation: 'Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors',
      'Job Zone': '4',
      'Data-level': 'Y',
      Code: '13-2011.00',
    },
  ],
};
