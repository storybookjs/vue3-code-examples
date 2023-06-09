import type { Meta, StoryFn, StoryObj } from '@storybook/vue3';

import Button from './Button.vue';
import AnimatedNumber from './AnimatedNumber.vue';
import { h } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },
  args: { primary: false }, // default value
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/vue/api/csf
 * to learn how to use render functions.
 */
const sblogo = 'https://iconape.com/wp-content/files/qa/371510/svg/371510.svg';

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Storybook',
    icon: h('img',{src:sblogo,height:30}),
    default:h('span',{style:{color:'red',padding:'20px'}},'Default Slot Content')
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Button',
    default:()=>'Default Slot Content as Text',
  },
};

export const MultiComponents: Story = {
  args: {
    label: 'Button',
    size: 'small',
    backgroundColor: '#aa00ff',
    duration:10,
    btn1Args:{label:'Button 10',size:'small',backgroundColor:'#aa00ff'},
    btn2Args:{label:'Button 20',size:'small',backgroundColor:'#aa00ff'},
  },
  render(args: any){
    return ({
    components: { Button ,AnimatedNumber},
    setup(props) {
      return { args  };
    },
    template: `<div style="background-color:pink;opacity:0.9;padding:20px" >
                <div style="display:flex;gap:10px">
                  <img src="https://user-images.githubusercontent.com/263385/199832481-bbbf5961-6a26-481d-8224-51258cce9b33.png" width="200" />  
                  <Button v-bind="args.btn1Args" />&nbsp;
                  <Button v-bind="args.btn2Args" />&nbsp;
                </div>
                <b>Wrapped Story </b>
                <AnimatedNumber :duration="args.duration"  />
                <div style="margin:8px"><span style="font-size:28px;color:green">Multiple </span>
                <span style="background-color:magenta;opacity:0.9;padding:8px"><i>Components</i></span></div>
                <div style="display:flex;gap:10px"><Button v-bind="args" /><Button label="Static Label Dynamic color" :background-color="args.backgroundColor"/>  </div>   
               </div>` ,
    })
  },
};


export const WithRenderTemplate: Story = {
  args: {
    label: 'Button', // component prop
    size: 'small', // component prop
    fontSize:20, // render function prop / story arg
    backgroundColor: '#aa00ff', // component prop
  },
  render(args: any){
    return ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `<Button v-bind="args" > <div :style="{ fontSize: args.fontSize + 'px' , fontColor:args.backgroundColor }"> Font Size {{args.fontSize}}</div> </Button>` ,
    })
  },
};

WithRenderTemplate.decorators  =[  
  () => ({
    template: '<div style="display: flex; padding: 20px; background-color: #cccc72;"><story /></div>',
  }),
];
