import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SongPrintTransposeModal-CBHJ99e4.js";var r,i,a,o,s,c,l,u,d,f,p,m;e((()=>{t(),{expect:r,fn:i,userEvent:a,within:o}=__STORYBOOK_MODULE_TEST__,s={title:`Views/Song Print/Transpose Modal`,component:n,tags:[`autodocs`],parameters:{layout:`fullscreen`}},c={isOpen:!0,onClose:i(),currentKey:`C`,targetKey:`D`,onTargetKeyChange:i(),beforeChords:[`C`,`G`,`Am`,`F`],afterChords:[`D`,`A`,`Bm`,`G`],semitones:2,onApply:i()},l={args:c},u={args:{...c,targetKey:`C`,afterChords:c.beforeChords,semitones:0}},d={args:{...c,targetKey:`A`,afterChords:[`A`,`E`,`F#m`,`D`],semitones:-3}},f={args:c,play:async({args:e})=>{let t=o(document.body);await a.click(await t.findByRole(`button`,{name:`Transpose & save`})),await r(e.onApply).toHaveBeenCalled()}},p={args:c,play:async({args:e})=>{let t=o(document.body);await a.click(await t.findByRole(`button`,{name:`Cancel`})),await r(e.onClose).toHaveBeenCalled()}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    targetKey: "C",
    afterChords: defaultArgs.beforeChords,
    semitones: 0
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    targetKey: "A",
    afterChords: ["A", "E", "F#m", "D"],
    semitones: -3
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args
  }) => {
    const dialog = within(document.body);
    await userEvent.click(await dialog.findByRole("button", {
      name: "Transpose & save"
    }));
    await expect(args.onApply).toHaveBeenCalled();
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args
  }) => {
    const dialog = within(document.body);
    await userEvent.click(await dialog.findByRole("button", {
      name: "Cancel"
    }));
    await expect(args.onClose).toHaveBeenCalled();
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`NoChange`,`DownwardInterval`,`Applying`,`Cancelling`]}))();export{f as Applying,p as Cancelling,l as Default,d as DownwardInterval,u as NoChange,m as __namedExportsOrder,s as default};