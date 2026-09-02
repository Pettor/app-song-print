import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SongPrintToolsMenu-H7VKqoV0.js";var r,i,a,o,s,c,l,u,d,f,p,m;e((()=>{t(),{expect:r,fn:i,userEvent:a,within:o}=__STORYBOOK_MODULE_TEST__,s={title:`Views/Song Print/Tools Menu`,component:n,tags:[`autodocs`]},c={fontSize:13,onFontSizeStep:i(),format:`A4`,onFormatChange:i(),chordStyle:`chip`,onChordStyleChange:i(),onOpenTranspose:i(),isDisabled:!1},l={args:c},u={args:{...c,fontSize:18,format:`Letter`,chordStyle:`accent`}},d={args:{...c,isDisabled:!0}},f={args:c,play:async({canvasElement:e,args:t})=>{let n=o(e);await a.click(n.getByRole(`button`,{name:`Increase font size`})),await r(t.onFontSizeStep).toHaveBeenCalledWith(1)}},p={args:c,play:async({canvasElement:e,args:t})=>{let n=o(e);await a.click(n.getByText(`Transpose sheet`)),await r(t.onOpenTranspose).toHaveBeenCalled()}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    fontSize: 18,
    format: "Letter",
    chordStyle: "accent"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isDisabled: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: "Increase font size"
    }));
    await expect(args.onFontSizeStep).toHaveBeenCalledWith(1);
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Transpose sheet"));
    await expect(args.onOpenTranspose).toHaveBeenCalled();
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`LargeTypeOnLetter`,`Disabled`,`IncreasingFontSize`,`OpeningTranspose`]}))();export{l as Default,d as Disabled,f as IncreasingFontSize,u as LargeTypeOnLetter,p as OpeningTranspose,m as __namedExportsOrder,s as default};