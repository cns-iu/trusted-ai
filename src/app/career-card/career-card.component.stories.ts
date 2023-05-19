import { Meta, StoryFn } from '@storybook/angular';

import { CareerCardComponent } from './career-card.component';

export default {
  title: 'CareerCardComponent',
  component: CareerCardComponent,
} as Meta<CareerCardComponent>;

const Template: StoryFn<CareerCardComponent> = (args: CareerCardComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  jobInfo: {
    title: 'Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors',
    preparation: 4,
    code: '13-2011.00',
  },
};
