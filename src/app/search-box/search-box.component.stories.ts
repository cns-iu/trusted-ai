import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

import { SearchBoxComponent } from './search-box.component';

export default {
  title: 'SearchBoxComponent',
  component: SearchBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
} as Meta<SearchBoxComponent>;

const Template: StoryFn<SearchBoxComponent> = (args: SearchBoxComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
