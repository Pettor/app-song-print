import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SongPrintLiveOverlay-BpDcjR6v.js";var r,i,a,o,s,c,l,u,d,f,p,m;e((()=>{t(),{expect:r,fn:i,userEvent:a,within:o}=__STORYBOOK_MODULE_TEST__,s={title:`Views/Song Print/Live Overlay`,component:n,tags:[`autodocs`],parameters:{layout:`fullscreen`}},c={song:{title:`Example Song`,artist:`The Placeholders`,key:`C`,tempo:100,capo:2,sections:[{name:`Intro`,chords:[`C`,`G`,`Am`,`F`]},{name:`Verse 1`,lines:[`[C]Type your lyrics here, with [G]chords in brackets`,`[Am]One bracket per chord [F]change`]},{name:`Chorus`,lines:[`[C]This line repeats [G]as needed`],note:`repeat x2`}]},columns:1,fontSize:30,onFontSizeChange:i(),isScrolling:!1,onToggleScroll:i(),onExit:i(),scrollRef:{current:null}},l={args:c},u={args:{...c,isScrolling:!0}},d={args:{...c,columns:2,fontSize:22}},f={args:c,play:async({canvasElement:e,args:t})=>{let n=o(e);await a.click(n.getByRole(`button`,{name:`Exit`})),await r(t.onExit).toHaveBeenCalled()}},p={args:c,play:async({canvasElement:e,args:t})=>{let n=o(e);await a.click(n.getByRole(`button`,{name:`Auto-scroll`})),await r(t.onToggleScroll).toHaveBeenCalled()}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isScrolling: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    columns: 2,
    fontSize: 22
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: "Exit"
    }));
    await expect(args.onExit).toHaveBeenCalled();
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: "Auto-scroll"
    }));
    await expect(args.onToggleScroll).toHaveBeenCalled();
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`Scrolling`,`TwoColumns`,`Exiting`,`StartingAutoScroll`]}))();export{l as Default,f as Exiting,u as Scrolling,p as StartingAutoScroll,d as TwoColumns,m as __namedExportsOrder,s as default};