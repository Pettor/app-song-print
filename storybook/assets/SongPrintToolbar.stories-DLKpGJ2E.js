import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SongPrintToolbar-Cm_UYGFZ.js";var r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y;e((()=>{t(),{expect:r,fn:i,userEvent:a,waitFor:o,within:s}=__STORYBOOK_MODULE_TEST__,c={title:`Views/Song Print/Toolbar`,component:n,tags:[`autodocs`],parameters:{layout:`fullscreen`}},l={isSourceOpen:!0,onToggleSource:i(),columns:1,onColumnsChange:i(),isColumnsDisabled:!1,songs:[{id:`example`,label:`Example Song`,data:{title:`Example Song`}},{id:`another-song`,label:`Another Song`,data:{title:`Another Song`}}],selectedPresetId:`example`,onSelectPreset:i(),mode:`print`,onModeChange:i(),tools:{fontSize:13,onFontSizeStep:i(),format:`A4`,onFormatChange:i(),chordStyle:`chip`,onChordStyleChange:i(),onOpenTranspose:i(),isDisabled:!1},isDarkTheme:!1,onToggleTheme:i(),onExportPdf:i(),isExporting:!1},u={args:l},d={args:{...l,columns:2}},f={args:{...l,mode:`live`}},p={args:{...l,isSourceOpen:!1}},m={args:{...l,isDarkTheme:!0}},h={args:{...l,isExporting:!0}},g={args:{...l,selectedPresetId:``}},_={args:l,play:async({canvasElement:e,args:t})=>{let n=s(e);await a.click(n.getByRole(`radio`,{name:`2`})),await r(t.onColumnsChange).toHaveBeenCalledWith(2)}},v={args:l,play:async({canvasElement:e})=>{let t=s(e);await a.click(t.getByRole(`button`,{name:`Tools`})),await o(()=>r(s(document.body).getByText(`Transpose sheet`)).toBeVisible())}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    columns: 2
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    mode: "live"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isSourceOpen: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isDarkTheme: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isExporting: true
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    selectedPresetId: ""
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("radio", {
      name: "2"
    }));
    await expect(args.onColumnsChange).toHaveBeenCalledWith(2);
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: "Tools"
    }));

    // The popover renders in a portal, so it is looked up on the document, and
    // it fades in — hence waiting for it to actually be on screen.
    await waitFor(() => expect(within(document.body).getByText("Transpose sheet")).toBeVisible());
  }
}`,...v.parameters?.docs?.source}}},y=[`Default`,`TwoColumnsSelected`,`LiveMode`,`SourceHidden`,`DarkTheme`,`Exporting`,`OpenedFromFile`,`SelectingColumns`,`OpeningTools`]}))();export{m as DarkTheme,u as Default,h as Exporting,f as LiveMode,g as OpenedFromFile,v as OpeningTools,_ as SelectingColumns,p as SourceHidden,d as TwoColumnsSelected,y as __namedExportsOrder,c as default};