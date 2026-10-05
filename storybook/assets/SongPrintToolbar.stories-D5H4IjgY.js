import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SongPrintToolbar-5OGK4duY.js";var r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E;e((()=>{t(),{expect:r,fn:i,userEvent:a,waitFor:o,within:s}=__STORYBOOK_MODULE_TEST__,c={title:`Views/Song Print/Toolbar`,component:n,tags:[`autodocs`],parameters:{layout:`fullscreen`}},l=[{id:`example`,label:`Example Song`,data:{title:`Example Song`,order:1}},{id:`another-song`,label:`Another Song`,data:{title:`Another Song`,order:2}}],u={isSourceOpen:!0,onToggleSource:i(),columns:1,onColumnsChange:i(),isColumnsDisabled:!1,keyBasis:`transposed`,onKeyBasisChange:i(),isTransposed:!1,songs:l,selectedPresetId:`example`,onSelectPreset:i(),mode:`print`,onModeChange:i(),tools:{fontSize:13,onFontSizeStep:i(),format:`A4`,onFormatChange:i(),chordStyle:`chip`,onChordStyleChange:i(),onOpenTranspose:i(),isDisabled:!1},isDarkTheme:!1,onToggleTheme:i(),onExportPdf:i(),isExporting:!1},d={args:u},f={args:{...u,columns:2}},p={args:{...u,mode:`live`}},m={args:{...u,isSourceOpen:!1}},h={args:{...u,isDarkTheme:!0}},g={args:{...u,isExporting:!0}},_={args:{...u,selectedPresetId:``}},v={args:{...u,isTransposed:!0}},y={args:{...u,isTransposed:!0,keyBasis:`original`}},b={args:u,play:async({canvasElement:e,args:t})=>{let n=s(e);await a.click(n.getByRole(`radio`,{name:`2`})),await r(t.onColumnsChange).toHaveBeenCalledWith(2)}},x={args:u,play:async({canvasElement:e})=>{let t=s(e);await a.click(t.getByRole(`button`,{name:`Tools`})),await o(()=>r(s(document.body).getByText(`Transpose sheet`)).toBeVisible())}},S={args:{...u,isTransposed:!0},play:async({canvasElement:e,args:t})=>{let n=s(e);await a.click(n.getByRole(`radio`,{name:`Original`})),await r(t.onKeyBasisChange).toHaveBeenCalledWith(`original`)}},C={args:u,play:async({canvasElement:e})=>{let t=s(e);await r(t.queryByRole(`radiogroup`,{name:`Printed key`})).toBeNull()}},w={args:u,play:async({canvasElement:e})=>{let t=s(e).getByRole(`button`,{name:/Song/});await r(t).toHaveTextContent(`1`),await r(t).toHaveTextContent(`Example Song`),await a.click(t);let n=await o(()=>s(document.body).getByRole(`option`,{name:/Another Song/}));await r(n).toHaveTextContent(`2`)}},T={args:{...u,songs:l.map(e=>({...e,data:{title:e.data.title}}))}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    columns: 2
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    mode: "live"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isSourceOpen: false
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isDarkTheme: true
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isExporting: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    selectedPresetId: ""
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isTransposed: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isTransposed: true,
    keyBasis: "original"
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isTransposed: true
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("radio", {
      name: "Original"
    }));
    await expect(args.onKeyBasisChange).toHaveBeenCalledWith("original");
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Nothing to choose between until the song carries a transpose offset.
    await expect(canvas.queryByRole("radiogroup", {
      name: "Printed key"
    })).toBeNull();
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", {
      name: /Song/
    });

    // The trigger names the song on the sheet, with the position it plays in.
    await expect(trigger).toHaveTextContent("1");
    await expect(trigger).toHaveTextContent("Example Song");
    await userEvent.click(trigger);

    // The listbox renders in a portal, so it is looked up on the document.
    const option = await waitFor(() => within(document.body).getByRole("option", {
      name: /Another Song/
    }));
    await expect(option).toHaveTextContent("2");
  }
}`,...w.parameters?.docs?.source},description:{story:`Setlist positions lead the picker, so the list reads as the running order.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    songs: songs.map(song => ({
      ...song,
      data: {
        title: song.data.title
      }
    }))
  }
}`,...T.parameters?.docs?.source},description:{story:`A library nobody has numbered yet: the picker is labels only.`,...T.parameters?.docs?.description}}},E=[`Default`,`TwoColumnsSelected`,`LiveMode`,`SourceHidden`,`DarkTheme`,`Exporting`,`OpenedFromFile`,`Transposed`,`OriginalKeySelected`,`SelectingColumns`,`OpeningTools`,`ChoosingTheOriginalKey`,`KeyBasisHiddenWithoutAnOffset`,`SetlistOrderInThePicker`,`UnorderedLibrary`]}))();export{S as ChoosingTheOriginalKey,h as DarkTheme,d as Default,g as Exporting,C as KeyBasisHiddenWithoutAnOffset,p as LiveMode,_ as OpenedFromFile,x as OpeningTools,y as OriginalKeySelected,b as SelectingColumns,w as SetlistOrderInThePicker,m as SourceHidden,v as Transposed,f as TwoColumnsSelected,T as UnorderedLibrary,E as __namedExportsOrder,c as default};