import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,r as n,t as r}from"./iframe-CvRYsGbX.js";import{n as i,t as a}from"./SongPrintEditorPanel-DJKrS4dI.js";import{n as o,t as s}from"./SongPrintLiveOverlay-BpDcjR6v.js";import{n as c,t as l}from"./SongPrintPreviewPanel-BcgpSPPY.js";import{n as u,t as d}from"./SongPrintToolbar-Cm_UYGFZ.js";import{n as f,t as p}from"./SongPrintTransposeModal-CBHJ99e4.js";function m({toolbar:e,editor:n,preview:r,transpose:i,live:o,isLive:c,isSourceOpen:u,editorWidth:f,onSplitterMouseDown:m}){let g=t();return(0,h.jsxs)(`div`,{className:`flex h-screen flex-col overflow-hidden`,children:[(0,h.jsx)(d,{...e}),(0,h.jsxs)(`div`,{className:`flex min-h-0 flex-1`,children:[(0,h.jsx)(`div`,{style:{flex:`0 0 ${u?f:0}px`},className:`min-w-0 overflow-hidden transition-[flex-basis] duration-200`,inert:!u,children:(0,h.jsx)(a,{...n})}),u&&(0,h.jsx)(`div`,{role:`separator`,"aria-orientation":`vertical`,"aria-label":g.formatMessage({description:`SongPrintView: aria-label - drag handle between editor and preview panes`,defaultMessage:`Resize editor pane`,id:`qLOFEp`}),onMouseDown:m,className:`hover:bg-default-300 z-10 w-1.5 flex-none cursor-col-resize bg-transparent transition-colors`}),(0,h.jsx)(l,{...r})]}),(0,h.jsx)(p,{...i}),c&&(0,h.jsx)(s,{...o})]})}var h,g=e((()=>{r(),i(),o(),c(),u(),f(),h=n(),m.__docgenInfo={description:``,methods:[],displayName:`SongPrintView`,props:{toolbar:{required:!0,tsType:{name:`SongPrintToolbarProps`},description:``},editor:{required:!0,tsType:{name:`SongPrintEditorPanelProps`},description:``},preview:{required:!0,tsType:{name:`SongPrintPreviewPanelProps`},description:``},transpose:{required:!0,tsType:{name:`SongPrintTransposeModalProps`},description:``},live:{required:!0,tsType:{name:`SongPrintLiveOverlayProps`},description:``},isLive:{required:!0,tsType:{name:`boolean`},description:``},isSourceOpen:{required:!0,tsType:{name:`boolean`},description:``},editorWidth:{required:!0,tsType:{name:`number`},description:``},onSplitterMouseDown:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),_,v,y,b,x,S,C,w,T,E;e((()=>{g(),{fn:_}=__STORYBOOK_MODULE_TEST__,v={title:`Views/Song Print`,component:m,tags:[`autodocs`],parameters:{layout:`fullscreen`}},y={title:`Example Song`,artist:`The Placeholders`,key:`C`,tempo:100,sections:[{name:`Intro`,chords:[`C`,`G`,`Am`,`F`]},{name:`Verse 1`,lines:[`[C]Type your lyrics here, with [G]chords in brackets`]}]},b=[{id:`example`,label:`Example Song`,data:y}],x={toolbar:{isSourceOpen:!0,onToggleSource:_(),columns:1,onColumnsChange:_(),isColumnsDisabled:!1,songs:b,selectedPresetId:`example`,onSelectPreset:_(),mode:`print`,onModeChange:_(),tools:{fontSize:13,onFontSizeStep:_(),format:`A4`,onFormatChange:_(),chordStyle:`chip`,onChordStyleChange:_(),onOpenTranspose:_(),isDisabled:!1},isDarkTheme:!1,onToggleTheme:_(),onExportPdf:_(),isExporting:!1},editor:{fileName:null,text:JSON.stringify(y,null,2),onTextChange:_(),onTabKey:_(),error:null,canImportTab:!1,onImportTab:_(),onOpenFile:_(),onSaveFile:_(),onDownloadFile:_(),onFormat:_(),canSave:!0,saveTitle:`Save to SONGS_DIR`,saved:!1,saveError:null},preview:{song:y,chordStyle:`chip`,scale:1,containerRef:{current:null}},transpose:{isOpen:!1,onClose:_(),currentKey:`C`,targetKey:`C`,onTargetKeyChange:_(),beforeChords:[`C`,`G`,`Am`,`F`],afterChords:[`C`,`G`,`Am`,`F`],semitones:0,onApply:_()},live:{song:y,columns:1,fontSize:30,onFontSizeChange:_(),isScrolling:!1,onToggleScroll:_(),onExit:_(),scrollRef:{current:null}},isLive:!1,isSourceOpen:!0,editorWidth:448,onSplitterMouseDown:_()},S={args:x},C={args:{...x,isSourceOpen:!1,toolbar:{...x.toolbar,isSourceOpen:!1}}},w={args:{...x,isLive:!0,toolbar:{...x.toolbar,mode:`live`}}},T={args:{...x,transpose:{...x.transpose,isOpen:!0,targetKey:`D`,afterChords:[`D`,`A`,`Bm`,`G`],semitones:2}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isSourceOpen: false,
    toolbar: {
      ...defaultArgs.toolbar,
      isSourceOpen: false
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isLive: true,
    toolbar: {
      ...defaultArgs.toolbar,
      mode: "live"
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    transpose: {
      ...defaultArgs.transpose,
      isOpen: true,
      targetKey: "D",
      afterChords: ["D", "A", "Bm", "G"],
      semitones: 2
    }
  }
}`,...T.parameters?.docs?.source}}},E=[`Default`,`SourceHidden`,`LiveMode`,`Transposing`]}))();export{S as Default,w as LiveMode,C as SourceHidden,T as Transposing,E as __namedExportsOrder,v as default};