import{i as e}from"./preload-helper-CT_b8DTk.js";import{r as t}from"./iframe-CvRYsGbX.js";import{n,t as r}from"./SongPrintEditorPanel-DJKrS4dI.js";var i,a,o,s,c,l,u,d,f,p,m;e((()=>{n(),i=t(),{fn:a}=__STORYBOOK_MODULE_TEST__,o=e=>(0,i.jsx)(`div`,{style:{height:`600px`},children:(0,i.jsx)(e,{})}),s={title:`Views/Song Print/Editor Panel`,component:r,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[o]},c={fileName:null,text:JSON.stringify({title:`Example Song`,key:`C`,sections:[{name:`Verse 1`,lines:[`[C]Type your lyrics here, with [G]chords in brackets`]}]},null,2),onTextChange:a(),onTabKey:a(),error:null,canImportTab:!1,onImportTab:a(),onOpenFile:a(),onSaveFile:a(),onDownloadFile:a(),onFormat:a(),canSave:!0,saveTitle:`Save to SONGS_DIR`,saved:!1,saveError:null},l={args:c},u={args:{...c,text:`{ not valid json`,error:`Unexpected token n in JSON at position 2`}},d={args:{...c,text:`[Verse]
C        G
Hello world`,error:`Unexpected token [ in JSON at position 0`,canImportTab:!0}},f={args:{...c,fileName:`my-song.json`,saveTitle:`Save my-song.json`}},p={args:{...c,saveError:`save failed (500)`,saveTitle:`Save failed: save failed (500)`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    text: "{ not valid json",
    error: "Unexpected token n in JSON at position 2"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    text: "[Verse]\\nC        G\\nHello world",
    error: "Unexpected token [ in JSON at position 0",
    canImportTab: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    fileName: "my-song.json",
    saveTitle: "Save my-song.json"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    saveError: "save failed (500)",
    saveTitle: "Save failed: save failed (500)"
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`InvalidJson`,`TabPasted`,`OpenedFile`,`SaveFailed`]}))();export{l as Default,u as InvalidJson,f as OpenedFile,p as SaveFailed,d as TabPasted,m as __namedExportsOrder,s as default};