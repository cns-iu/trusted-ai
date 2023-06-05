import { Meta, StoryFn } from '@storybook/angular';

import { OccupationsSearchAreaComponent } from './occupations-search-area.component';

export default {
  title: 'OccupationsSearchAreaComponent',
  component: OccupationsSearchAreaComponent,
} as Meta<OccupationsSearchAreaComponent>;

const Template: StoryFn<OccupationsSearchAreaComponent> = (args: OccupationsSearchAreaComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
