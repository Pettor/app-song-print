import{i as e}from"./preload-helper-CT_b8DTk.js";import{r as t}from"./iframe-CvRYsGbX.js";import{n,t as r}from"./SongStage-CJnWbyO9.js";var i,a,o,s,c,l,u,d,f;e((()=>{n(),i=t(),a={title:`Display/SongStage`,component:r,tags:[`autodocs`],decorators:[e=>(0,i.jsx)(`div`,{className:`bg-[#07080a] p-8`,children:(0,i.jsx)(e,{})})]},o={title:`Example Song`,artist:`The Placeholders`,key:`C`,tempo:100,sections:[{name:`Intro`,chords:[`C`,`G`,`Am`,`F`]},{name:`Verse 1`,lines:[`[C]Type your lyrics here, with [G]chords in brackets`,`[Am]One bracket per chord [F]change`]},{name:`Chorus`,lines:[`[C]This line repeats [G]as needed`],note:`repeat x2`}]},s={song:o,fontSize:30},c={args:s},l={args:{...s,fontSize:48}},u={args:{...s,columns:2}},d={args:{...s,song:{...o,transpose:2}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    fontSize: 48
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    columns: 2
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    song: {
      ...exampleSong,
      transpose: 2
    }
  }
}`,...d.parameters?.docs?.source}}},f=[`Default`,`LargeType`,`TwoColumns`,`Transposed`]}))();export{c as Default,l as LargeType,d as Transposed,u as TwoColumns,f as __namedExportsOrder,a as default};