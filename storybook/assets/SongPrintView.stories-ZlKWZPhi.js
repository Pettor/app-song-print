import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,r as n,t as r}from"./iframe-CPvST--1.js";import{n as i,t as a}from"./SongPrintEditorPanel-DSSE5ani.js";import{n as o,t as s}from"./SongPrintExportStage-BBq6wwLt.js";import{n as c,t as l}from"./SongPrintLiveOverlay-WZeLudBW.js";import{n as u,t as d}from"./SongPrintPreviewPanel-B129WuW0.js";import{n as f,t as p}from"./SongPrintToolbar-BB4PwlD5.js";import{n as m,t as h}from"./SongPrintTransposeModal-BU32p8tG.js";function g({toolbar:e,editor:n,preview:r,exportStage:i,transpose:o,live:c,isLive:u,isSourceOpen:f,editorWidth:m,onSplitterMouseDown:g}){let v=t();return(0,_.jsxs)(`div`,{className:`flex h-screen flex-col overflow-hidden`,children:[(0,_.jsx)(p,{...e}),(0,_.jsxs)(`div`,{className:`flex min-h-0 flex-1`,children:[(0,_.jsx)(`div`,{style:{flex:`0 0 ${f?m:0}px`},className:`min-w-0 overflow-hidden transition-[flex-basis] duration-200`,inert:!f,children:(0,_.jsx)(a,{...n})}),f&&(0,_.jsx)(`div`,{role:`separator`,"aria-orientation":`vertical`,"aria-label":v.formatMessage({description:`SongPrintView: aria-label - drag handle between editor and preview panes`,defaultMessage:`Resize editor pane`,id:`qLOFEp`}),onMouseDown:g,className:`hover:bg-default-300 z-10 w-1.5 flex-none cursor-col-resize bg-transparent transition-colors`}),(0,_.jsx)(d,{...r})]}),(0,_.jsx)(h,{...o}),u&&(0,_.jsx)(l,{...c}),(0,_.jsx)(s,{...i})]})}var _,v=e((()=>{r(),i(),o(),c(),u(),f(),m(),_=n(),g.__docgenInfo={description:``,methods:[],displayName:`SongPrintView`,props:{toolbar:{required:!0,tsType:{name:`SongPrintToolbarProps`},description:``},editor:{required:!0,tsType:{name:`SongPrintEditorPanelProps`},description:``},preview:{required:!0,tsType:{name:`SongPrintPreviewPanelProps`},description:``},exportStage:{required:!0,tsType:{name:`SongPrintExportStageProps`},description:``},transpose:{required:!0,tsType:{name:`SongPrintTransposeModalProps`},description:``},live:{required:!0,tsType:{name:`SongPrintLiveOverlayProps`},description:``},isLive:{required:!0,tsType:{name:`boolean`},description:``},isSourceOpen:{required:!0,tsType:{name:`boolean`},description:``},editorWidth:{required:!0,tsType:{name:`number`},description:``},onSplitterMouseDown:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),y,b,x,S,C,w,T,E,D,O,k;e((()=>{v(),{fn:y}=__STORYBOOK_MODULE_TEST__,b={title:`Views/Song Print`,component:g,tags:[`autodocs`],parameters:{layout:`fullscreen`}},x={title:`Example Song`,artist:`The Placeholders`,key:`C`,tempo:100,sections:[{name:`Intro`,chords:[`C`,`G`,`Am`,`F`]},{name:`Verse 1`,lines:[`[C]Type your lyrics here, with [G]chords in brackets`]}]},S=[{id:`example`,label:`Example Song`,data:x}],C={toolbar:{isSourceOpen:!0,onToggleSource:y(),columns:1,onColumnsChange:y(),isColumnsDisabled:!1,keyBasis:`transposed`,onKeyBasisChange:y(),isTransposed:!1,songs:S,selectedPresetId:`example`,onSelectPreset:y(),mode:`print`,onModeChange:y(),tools:{fontSize:13,onFontSizeStep:y(),format:`A4`,onFormatChange:y(),chordStyle:`chip`,onChordStyleChange:y(),onOpenTranspose:y(),isDisabled:!1},isDarkTheme:!1,onToggleTheme:y(),onExportPdf:y(),isExporting:!1,onExportAll:y(),isExportingAll:!1,exportedSongs:0},editor:{fileName:null,text:JSON.stringify(x,null,2),onTextChange:y(),onTabKey:y(),error:null,canImportTab:!1,onImportTab:y(),onOpenFile:y(),onSaveFile:y(),onDownloadFile:y(),onFormat:y(),canSave:!0,saveTitle:`Save to SONGS_DIR`,saved:!1,saveError:null},preview:{song:x,chordStyle:`chip`,keyBasis:`transposed`,scale:1,containerRef:{current:null}},exportStage:{song:null,songId:``,chordStyle:`chip`,keyBasis:`transposed`,containerRef:{current:null}},transpose:{isOpen:!1,onClose:y(),currentKey:`C`,targetKey:`C`,onTargetKeyChange:y(),beforeChords:[`C`,`G`,`Am`,`F`],afterChords:[`C`,`G`,`Am`,`F`],semitones:0,onApply:y()},live:{song:x,columns:1,fontSize:30,onFontSizeChange:y(),isScrolling:!1,onToggleScroll:y(),onExit:y(),scrollRef:{current:null},keyBasis:`transposed`},isLive:!1,isSourceOpen:!0,editorWidth:448,onSplitterMouseDown:y()},w={args:C},T={args:{...C,isSourceOpen:!1,toolbar:{...C.toolbar,isSourceOpen:!1}}},E={args:{...C,isLive:!0,toolbar:{...C.toolbar,mode:`live`}}},D={args:{...C,transpose:{...C.transpose,isOpen:!0,targetKey:`D`,afterChords:[`D`,`A`,`Bm`,`G`],semitones:2}}},O={args:{...C,toolbar:{...C.toolbar,isTransposed:!0,keyBasis:`original`},preview:{...C.preview,song:{...x,transpose:2},keyBasis:`original`},live:{...C.live,song:{...x,transpose:2},keyBasis:`original`}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isSourceOpen: false,
    toolbar: {
      ...defaultArgs.toolbar,
      isSourceOpen: false
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isLive: true,
    toolbar: {
      ...defaultArgs.toolbar,
      mode: "live"
    }
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    toolbar: {
      ...defaultArgs.toolbar,
      isTransposed: true,
      keyBasis: "original"
    },
    preview: {
      ...defaultArgs.preview,
      song: {
        ...exampleSong,
        transpose: 2
      },
      keyBasis: "original"
    },
    live: {
      ...defaultArgs.live,
      song: {
        ...exampleSong,
        transpose: 2
      },
      keyBasis: "original"
    }
  }
}`,...O.parameters?.docs?.source},description:{story:`A song carrying an offset, printed in its original key.`,...O.parameters?.docs?.description}}},k=[`Default`,`SourceHidden`,`LiveMode`,`Transposing`,`OriginalKey`]}))();export{w as Default,E as LiveMode,O as OriginalKey,T as SourceHidden,D as Transposing,k as __namedExportsOrder,b as default};