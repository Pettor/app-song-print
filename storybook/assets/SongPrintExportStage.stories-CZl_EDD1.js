import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SongPrintExportStage-BBq6wwLt.js";var r,i,a,o,s,c,l;e((()=>{t(),{expect:r,waitFor:i}=__STORYBOOK_MODULE_TEST__,a={title:`Views/Song Print/Export Stage`,component:n,tags:[`autodocs`]},o={song:{title:`Example Song`,artist:`The Placeholders`,key:`C`,page:{format:`A4`,columns:1,fontSize:13},sections:[{name:`Intro`,chords:[`C`,`G`,`Am`,`F`]},{name:`Verse 1`,lines:[`[C]Type your lyrics here, with [G]chords in brackets`]}]},songId:`example`,chordStyle:`chip`,keyBasis:`transposed`,containerRef:{current:null}},s={args:o,play:async({canvasElement:e})=>{let t=e.querySelector(`[data-song-id]`);if(!t)throw Error(`Nothing was staged`);await r(t.dataset.songId).toBe(`example`),await i(async()=>{await r(t.querySelector(`.sp-doc[data-measured]`)).not.toBeNull()}),await r(t.querySelectorAll(`.sp-page`)).toHaveLength(1)}},c={args:{...o,song:null},play:async({canvasElement:e})=>{await r(e.querySelector(`[data-song-id]`)).toBeNull()}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvasElement
  }) => {
    const stage = canvasElement.querySelector<HTMLElement>("[data-song-id]");
    if (!stage) throw new Error("Nothing was staged");
    await expect(stage.dataset.songId).toBe("example");
    // \`data-measured\` is the signal a capture waits for: the sheet has packed
    // itself into pages and is no longer showing the unpacked fallback.
    await waitFor(async () => {
      await expect(stage.querySelector(".sp-doc[data-measured]")).not.toBeNull();
    });
    await expect(stage.querySelectorAll(".sp-page")).toHaveLength(1);
  }
}`,...s.parameters?.docs?.source},description:{story:`A song staged for capture. The sheet is drawn at full page size and parked
off-screen, so the story itself looks empty — what matters is in the DOM.`,...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    song: null
  },
  play: async ({
    canvasElement
  }) => {
    await expect(canvasElement.querySelector("[data-song-id]")).toBeNull();
  }
}`,...c.parameters?.docs?.source},description:{story:`Between exports nothing is mounted at all.`,...c.parameters?.docs?.description}}},l=[`Staged`,`Idle`]}))();export{c as Idle,s as Staged,l as __namedExportsOrder,a as default};