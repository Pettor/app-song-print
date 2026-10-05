import{i as e}from"./preload-helper-CT_b8DTk.js";import{r as t}from"./iframe-Cpr0_F-n.js";import{n,t as r}from"./SongPrintPreviewPanel-BY0d-Oxr.js";var i,a,o,s,c,l,u,d,f,p;e((()=>{n(),i=t(),a=e=>(0,i.jsx)(`div`,{style:{height:`700px`},children:(0,i.jsx)(e,{})}),o={title:`Views/Song Print/Preview Panel`,component:r,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[a]},s={title:`Example Song`,key:`C`,sections:[{name:`Intro`,chords:[`C`,`G`,`Am`,`F`]},{name:`Verse 1`,lines:[`[C]Type your lyrics here, with [G]chords in brackets`]}]},c={song:s,chordStyle:`chip`,keyBasis:`transposed`,scale:1,containerRef:{current:null}},l={args:c},u={args:{...c,scale:.6}},d={args:{...c,chordStyle:`plain`}},f={args:{...c,song:{...s,transpose:2},keyBasis:`original`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    scale: 0.6
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    chordStyle: "plain"
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    song: {
      ...exampleSong,
      transpose: 2
    },
    keyBasis: "original"
  }
}`,...f.parameters?.docs?.source}}},p=[`Default`,`ScaledDown`,`PlainChords`,`OriginalKey`]}))();export{l as Default,f as OriginalKey,d as PlainChords,u as ScaledDown,p as __namedExportsOrder,o as default};