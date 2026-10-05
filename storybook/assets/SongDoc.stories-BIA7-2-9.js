import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SongDoc-Db_6gKT4.js";function r(e){let t=e.querySelector(`.sp-page`);if(!t)throw Error(`No page was drawn`);return Object.fromEntries(Array.from(t.querySelectorAll(`.sp-metachip`)).map(e=>[e.querySelector(`.sp-metalabel`)?.textContent??``,e.querySelector(`.sp-metavalue`)?.textContent??``]))}function i(e){let t=e.querySelector(`.sp-page`);if(!t)throw Error(`No page was drawn`);return Array.from(t.querySelectorAll(`.sp-chord`)).map(e=>e.textContent??``)}function a(e){let t=e.querySelector(`.sp-page`);if(!t)throw Error(`No page was drawn`);return t.querySelector(`.sp-order`)?.textContent??null}function o(e){return Array.from(e.querySelectorAll(`.sp-page`))}function s(e){return Array.from(e.querySelectorAll(`.sp-secname`)).map(e=>e.textContent??``)}var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;e((()=>{t(),{expect:c,waitFor:l}=__STORYBOOK_MODULE_TEST__,u={title:`Display/SongDoc`,component:n,tags:[`autodocs`]},d={title:`Example Song`,artist:`The Placeholders`,key:`C`,capo:0,tempo:100,transpose:0,page:{format:`A4`,orientation:`portrait`,columns:1,fontSize:13},sections:[{name:`Intro`,chords:[`C`,`G`,`Am`,`F`]},{name:`Verse 1`,lines:[`[C]Type your lyrics here, with [G]chords in brackets`,`[Am]One bracket per chord [F]change`]},{name:`Chorus`,lines:[`[C]This line repeats [G]as needed`],note:`repeat x2`}]},f={args:{song:d},play:async({canvasElement:e})=>{await c(a(e)).toBeNull()}},p={args:{song:{...d,order:3}},play:async({canvasElement:e})=>{await c(a(e)).toBe(`3`)}},m={args:{song:{...d,transpose:2}},play:async({canvasElement:e})=>{await c(r(e).Key).toBe(`D`),await c(r(e).Transpose).toBeUndefined(),await c(i(e).slice(0,4)).toEqual([`D`,`A`,`Bm`,`G`])}},h={args:{song:{...d,transpose:2},keyBasis:`original`},play:async({canvasElement:e})=>{await c(r(e).Key).toBe(`C → D`),await c(r(e).Transpose).toBe(`+2`),await c(i(e).slice(0,4)).toEqual([`C`,`G`,`Am`,`F`])}},g={args:{song:{...d,transpose:-3},keyBasis:`original`},play:async({canvasElement:e})=>{await c(r(e).Key).toBe(`C → A`),await c(r(e).Transpose).toBe(`-3`)}},_={args:{song:{...d,page:{...d.page,columns:2}}}},v={args:{song:d,chordStyle:`accent`}},y={args:{song:d,chordStyle:`plain`}},b={args:{song:{...d,sections:[{name:`Verse 1`,lines:[`[C]First group, first line`,`[G]first group, second line`,`[bl]`,`[Am]Second group[bl][F]Split`]}]}},play:async({canvasElement:e})=>{let[t]=o(e);if(!t)throw Error(`No page was drawn`);await c(t.querySelectorAll(`.sp-line--blank`)).toHaveLength(2),await c(i(e)).toEqual([`C`,`G`,`Am`,`F`])}},x={args:{song:{...d,page:{...d.page,columns:2},sections:[{name:`Verse 1`,lines:[`[C]Ends the first page`,`[bp]`]},{name:`Chorus`,lines:[`[G]Opens the second one`]}]}},play:async({canvasElement:e})=>{await l(async()=>{await c(o(e)).toHaveLength(2)});let[t,n]=o(e);await c(s(t)).toEqual([`[Verse 1]`]),await c(s(n)).toEqual([`[Chorus]`])}},S={args:{song:{...d,sections:[{name:`Verse 1`,lines:[`[C]Stays on page one`,`[bp]`,`[G]Continues on page two`]}]}},play:async({canvasElement:e})=>{await l(async()=>{await c(o(e)).toHaveLength(2)});let[t,n]=o(e);await c(s(t)).toEqual([`[Verse 1]`]),await c(s(n)).toEqual([`[Verse 1 cont.]`])}},C={args:{song:{title:`Untitled`}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    song: exampleSong
  } satisfies ComponentProps,
  play: async ({
    canvasElement
  }) => {
    // No \`order\`, no badge — the header is the title alone.
    await expect(orderBadge(canvasElement)).toBeNull();
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      ...exampleSong,
      order: 3
    }
  } satisfies ComponentProps,
  play: async ({
    canvasElement
  }) => {
    await expect(orderBadge(canvasElement)).toBe("3");
  }
}`,...p.parameters?.docs?.source},description:{story:`A song placed in a setlist: its position is printed beside the title.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      ...exampleSong,
      transpose: 2
    }
  } satisfies ComponentProps,
  play: async ({
    canvasElement
  }) => {
    // One key and no offset chip: the sheet is read, not diffed.
    await expect(metaChips(canvasElement).Key).toBe("D");
    await expect(metaChips(canvasElement).Transpose).toBeUndefined();
    await expect(chords(canvasElement).slice(0, 4)).toEqual(["D", "A", "Bm", "G"]);
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      ...exampleSong,
      transpose: 2
    },
    keyBasis: "original"
  } satisfies ComponentProps,
  play: async ({
    canvasElement
  }) => {
    await expect(metaChips(canvasElement).Key).toBe("C \\u2192 D");
    await expect(metaChips(canvasElement).Transpose).toBe("+2");
    await expect(chords(canvasElement).slice(0, 4)).toEqual(["C", "G", "Am", "F"]);
  }
}`,...h.parameters?.docs?.source},description:{story:`The offset is in effect but the chords stay in the written key, for a player
transposing by hand while the band reads the transposed sheet: the key chip
names both keys and a fourth chip states the offset.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      ...exampleSong,
      transpose: -3
    },
    keyBasis: "original"
  } satisfies ComponentProps,
  play: async ({
    canvasElement
  }) => {
    await expect(metaChips(canvasElement).Key).toBe("C \\u2192 A");
    await expect(metaChips(canvasElement).Transpose).toBe("-3");
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      ...exampleSong,
      page: {
        ...exampleSong.page,
        columns: 2
      }
    }
  } satisfies ComponentProps
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    song: exampleSong,
    chordStyle: "accent"
  } satisfies ComponentProps
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    song: exampleSong,
    chordStyle: "plain"
  } satisfies ComponentProps
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      ...exampleSong,
      sections: [{
        name: "Verse 1",
        lines: ["[C]First group, first line", "[G]first group, second line", "[bl]", "[Am]Second group[bl][F]Split"]
      }]
    }
  } satisfies ComponentProps,
  play: async ({
    canvasElement
  }) => {
    const [first] = pages(canvasElement);
    if (!first) throw new Error("No page was drawn");

    // One blank from the standalone tag, one from the mid-line tag.
    await expect(first.querySelectorAll(".sp-line--blank")).toHaveLength(2);
    // The mid-line tag split its line rather than printing a "bl" chord.
    await expect(chords(canvasElement)).toEqual(["C", "G", "Am", "F"]);
  }
}`,...b.parameters?.docs?.source},description:{story:"`[bl]` breaks the line and leaves a blank one behind it, which is how two\nlyric groups inside one section are spaced apart.",...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      ...exampleSong,
      page: {
        ...exampleSong.page,
        columns: 2
      },
      sections: [{
        name: "Verse 1",
        lines: ["[C]Ends the first page", "[bp]"]
      }, {
        name: "Chorus",
        lines: ["[G]Opens the second one"]
      }]
    }
  } satisfies ComponentProps,
  play: async ({
    canvasElement
  }) => {
    await waitFor(async () => {
      await expect(pages(canvasElement)).toHaveLength(2);
    });
    const [first, second] = pages(canvasElement);
    await expect(sectionNames(first!)).toEqual(["[Verse 1]"]);
    await expect(sectionNames(second!)).toEqual(["[Chorus]"]);
  }
}`,...x.parameters?.docs?.source},description:{story:"`[bp]` sends what follows it to a new page, even with a second column still\nempty on the page it left.",...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      ...exampleSong,
      sections: [{
        name: "Verse 1",
        lines: ["[C]Stays on page one", "[bp]", "[G]Continues on page two"]
      }]
    }
  } satisfies ComponentProps,
  play: async ({
    canvasElement
  }) => {
    await waitFor(async () => {
      await expect(pages(canvasElement)).toHaveLength(2);
    });
    const [first, second] = pages(canvasElement);
    await expect(sectionNames(first!)).toEqual(["[Verse 1]"]);
    await expect(sectionNames(second!)).toEqual(["[Verse 1 cont.]"]);
  }
}`,...S.parameters?.docs?.source},description:{story:"A `[bp]` inside a section splits it, and the remainder is labelled `cont.`.",...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    song: {
      title: "Untitled"
    }
  } satisfies ComponentProps
}`,...C.parameters?.docs?.source}}},w=[`Default`,`SetlistOrder`,`Transposed`,`TransposedOriginalKey`,`TransposedDownOriginalKey`,`TwoColumns`,`AccentChords`,`PlainChords`,`BreakLine`,`BreakPage`,`BreakPageMidSection`,`Empty`]}))();export{v as AccentChords,b as BreakLine,x as BreakPage,S as BreakPageMidSection,f as Default,C as Empty,y as PlainChords,p as SetlistOrder,m as Transposed,g as TransposedDownOriginalKey,h as TransposedOriginalKey,_ as TwoColumns,w as __namedExportsOrder,u as default};