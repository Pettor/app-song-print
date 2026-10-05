import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SongPrintLiveOverlay-_NtO_6lo.js";var r,i,a,o,s,c,l,u,d,f,p,m,h,g,_;e((()=>{t(),{expect:r,fn:i,userEvent:a,within:o}=__STORYBOOK_MODULE_TEST__,s={title:`Views/Song Print/Live Overlay`,component:n,tags:[`autodocs`],parameters:{layout:`fullscreen`}},c={title:`Example Song`,artist:`The Placeholders`,key:`C`,tempo:100,capo:2,sections:[{name:`Intro`,chords:[`C`,`G`,`Am`,`F`]},{name:`Verse 1`,lines:[`[C]Type your lyrics here, with [G]chords in brackets`,`[Am]One bracket per chord [F]change`]},{name:`Chorus`,lines:[`[C]This line repeats [G]as needed`],note:`repeat x2`}]},l={song:c,columns:1,fontSize:30,onFontSizeChange:i(),isScrolling:!1,onToggleScroll:i(),onExit:i(),scrollRef:{current:null},keyBasis:`transposed`},u={args:l},d={args:{...l,isScrolling:!0}},f={args:{...l,columns:2,fontSize:22}},p={args:{...l,song:{...c,transpose:2}}},m={args:{...l,song:{...c,transpose:2},keyBasis:`original`}},h={args:l,play:async({canvasElement:e,args:t})=>{let n=o(e);await a.click(n.getByRole(`button`,{name:`Exit`})),await r(t.onExit).toHaveBeenCalled()}},g={args:l,play:async({canvasElement:e,args:t})=>{let n=o(e);await a.click(n.getByRole(`button`,{name:`Auto-scroll`})),await r(t.onToggleScroll).toHaveBeenCalled()}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isScrolling: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    columns: 2,
    fontSize: 22
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    song: {
      ...exampleSong,
      transpose: 2
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    song: {
      ...exampleSong,
      transpose: 2
    },
    keyBasis: "original"
  }
}`,...m.parameters?.docs?.source},description:{story:`Playing the original key while the band reads the transposed sheet.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Scrolling`,`TwoColumns`,`Transposed`,`OriginalKey`,`Exiting`,`StartingAutoScroll`]}))();export{u as Default,h as Exiting,m as OriginalKey,d as Scrolling,g as StartingAutoScroll,p as Transposed,f as TwoColumns,_ as __namedExportsOrder,s as default};