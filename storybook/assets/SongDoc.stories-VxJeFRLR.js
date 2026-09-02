import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SongDoc-BFJX-ZzV.js";var r,i,a,o,s,c,l,u,d;e((()=>{t(),r={title:`Display/SongDoc`,component:n,tags:[`autodocs`]},i={title:`Example Song`,artist:`The Placeholders`,key:`C`,capo:0,tempo:100,transpose:0,page:{format:`A4`,orientation:`portrait`,columns:1,fontSize:13},sections:[{name:`Intro`,chords:[`C`,`G`,`Am`,`F`]},{name:`Verse 1`,lines:[`[C]Type your lyrics here, with [G]chords in brackets`,`[Am]One bracket per chord [F]change`]},{name:`Chorus`,lines:[`[C]This line repeats [G]as needed`],note:`repeat x2`}]},a={args:{song:i}},o={args:{song:{...i,transpose:2}}},s={args:{song:{...i,page:{...i.page,columns:2}}}},c={args:{song:i,chordStyle:`accent`}},l={args:{song:i,chordStyle:`plain`}},u={args:{song:{title:`Untitled`}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    song: exampleSong
  } satisfies ComponentProps
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      ...exampleSong,
      transpose: 2
    }
  } satisfies ComponentProps
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      ...exampleSong,
      page: {
        ...exampleSong.page,
        columns: 2
      }
    }
  } satisfies ComponentProps
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    song: exampleSong,
    chordStyle: "accent"
  } satisfies ComponentProps
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    song: exampleSong,
    chordStyle: "plain"
  } satisfies ComponentProps
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      title: "Untitled"
    }
  } satisfies ComponentProps
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Transposed`,`TwoColumns`,`AccentChords`,`PlainChords`,`Empty`]}))();export{c as AccentChords,a as Default,u as Empty,l as PlainChords,o as Transposed,s as TwoColumns,d as __namedExportsOrder,r as default};