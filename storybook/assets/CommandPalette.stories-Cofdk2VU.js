import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{W as n,n as r,r as i,t as a}from"./iframe-CvRYsGbX.js";import{S as o,b as s,i as c,m as l,o as u,t as d,u as f,v as p}from"./esm-BpHsO8Rx.js";import{A as m,C as h,D as g,Q as _,k as v,p as y,t as b}from"./dist-BNyvRpVM.js";function x(){if(typeof navigator>`u`)return!1;let e=navigator.platform??``,t=navigator.userAgent??``;return/Mac|iPhone|iPad|iPod/.test(e)||/Mac|iPhone|iPad|iPod/.test(t)}var S=e((()=>{}));function C({isOpen:e,filtered:t,activeId:n,commands:r,onClose:i,setActiveId:a}){let o=(0,w.useRef)(t);o.current=t;let s=(0,w.useRef)(n);s.current=n;let c=(0,w.useRef)(r);c.current=r;let l=(0,w.useRef)(i);l.current=i,(0,w.useEffect)(()=>{if(!e)return;function t(e){let t=o.current;switch(e.key){case`ArrowDown`:{if(t.length===0)return;e.preventDefault(),e.stopPropagation();let n=s.current;a(t[((n?t.findIndex(e=>e.id===n):-1)+1+t.length)%t.length].id);return}case`ArrowUp`:{if(t.length===0)return;e.preventDefault(),e.stopPropagation();let n=s.current;a(t[((n?t.findIndex(e=>e.id===n):0)-1+t.length)%t.length].id);return}case`Home`:if(t.length===0)return;e.preventDefault(),e.stopPropagation(),a(t[0].id);return;case`End`:if(t.length===0)return;e.preventDefault(),e.stopPropagation(),a(t[t.length-1].id);return;case`Enter`:{let t=s.current;if(!t)return;e.preventDefault(),e.stopPropagation();let n=c.current.find(e=>e.id===t);if(!n)return;l.current(),queueMicrotask(()=>n.perform());return}case`Escape`:e.preventDefault(),e.stopPropagation(),l.current();return;default:return}}return document.addEventListener(`keydown`,t,!0),()=>document.removeEventListener(`keydown`,t,!0)},[e,a])}var w,T=e((()=>{w=t(n(),1)}));function E(e,t){let n=t.trim().toLowerCase();return n?e.filter(e=>[e.label,e.description??``,...e.keywords??[],e.group??``].join(` `).toLowerCase().includes(n)):e}function D(e){let t=new Map;for(let n of e){let e=n.group??M,r=t.get(e);r?r.push(n):t.set(e,[n])}return Array.from(t.entries()).map(([e,t])=>({name:e,commands:t}))}function O({shortcut:e}){let t=x();return(0,j.jsxs)(_,{className:`text-[10px]`,children:[e.mod&&(t?(0,j.jsx)(_.Abbr,{keyValue:`command`}):(0,j.jsx)(_.Content,{children:`Ctrl`})),e.alt&&(t?(0,j.jsx)(_.Abbr,{keyValue:`option`}):(0,j.jsx)(_.Content,{children:`Alt`})),e.shift&&(t?(0,j.jsx)(_.Abbr,{keyValue:`shift`}):(0,j.jsx)(_.Content,{children:`Shift`})),(0,j.jsx)(_.Content,{children:e.key.toUpperCase()})]})}function k({isOpen:e,commands:t,onClose:n}){let i=r(),[a,o]=(0,A.useState)(``),[s,c]=(0,A.useState)(void 0),u=(0,A.useRef)(null);(0,A.useEffect)(()=>{e&&o(``)},[e]);let d=(0,A.useMemo)(()=>E(t,a),[t,a]),f=(0,A.useMemo)(()=>D(d),[d]);(0,A.useEffect)(()=>{if(d.length===0){c(void 0);return}c(e=>e&&d.some(t=>t.id===e)?e:d[0].id)},[d]),(0,A.useEffect)(()=>{!s||!u.current||u.current.querySelector(`[data-command-id="${s}"]`)?.scrollIntoView({block:`nearest`})},[s]);function p(e){let r=t.find(t=>t.id===e);r&&(n(),queueMicrotask(()=>r.perform()))}return C({isOpen:e,filtered:d,activeId:s,commands:t,onClose:n,setActiveId:c}),(0,j.jsx)(y,{isOpen:e,onOpenChange:e=>!e&&n(),children:(0,j.jsx)(y.Backdrop,{variant:`blur`,children:(0,j.jsx)(y.Container,{size:`md`,children:(0,j.jsxs)(y.Dialog,{"aria-label":i.formatMessage({description:`CommandPalette: aria-label - dialog`,defaultMessage:`Command palette`,id:`dgEdHD`}),className:`flex h-[480px] flex-col overflow-hidden shadow-2xl`,children:[(0,j.jsx)(y.Header,{className:`shrink-0 border-b p-0`,children:(0,j.jsx)(h,{"aria-label":`command-palette-search`,className:`w-full`,children:(0,j.jsxs)(g,{fullWidth:!0,className:`border-0 shadow-none`,children:[(0,j.jsx)(m,{children:(0,j.jsx)(l,{className:`text-default-500 h-5 w-5`})}),(0,j.jsx)(v,{autoFocus:!0,value:a,onChange:e=>o(e.target.value),placeholder:i.formatMessage({description:`CommandPalette: placeholder - search`,defaultMessage:`Type a command or search…`,id:`jzHua/`}),"aria-activedescendant":s?`command-palette__option-${s}`:void 0,"data-testid":`command-palette__search`})]})})}),(0,j.jsx)(y.Body,{className:`min-h-0 flex-1 overflow-y-auto p-2`,children:(0,j.jsx)(`div`,{ref:u,className:`h-full`,children:d.length===0?(0,j.jsx)(`div`,{className:`text-default-500 flex h-full items-center justify-center p-6 text-sm`,children:i.formatMessage({description:`CommandPalette: empty-state - no commands found`,defaultMessage:`No commands found`,id:`TtuPpt`})}):(0,j.jsx)(`div`,{role:`listbox`,"aria-label":`Commands`,className:`flex flex-col gap-3`,children:f.map(e=>(0,j.jsxs)(`div`,{children:[e.name!==M&&(0,j.jsx)(`div`,{className:`text-default-500 px-2 pb-1 text-xs font-medium uppercase`,children:e.name}),(0,j.jsx)(`div`,{className:`flex flex-col`,children:e.commands.map(e=>{let t=e.id===s;return(0,j.jsxs)(`div`,{id:`command-palette__option-${e.id}`,role:`option`,"aria-selected":t,"data-command-id":e.id,"data-testid":`command-palette__item-${e.id}`,onMouseEnter:()=>c(e.id),onMouseDown:t=>{t.preventDefault(),p(e.id)},className:`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${t?`border-accent bg-accent/10 text-default-900 font-medium`:`text-default-700 border-transparent`}`,children:[e.icon&&(0,j.jsx)(`span`,{className:`text-default-600 flex h-5 w-5 items-center justify-center`,children:e.icon}),(0,j.jsxs)(`div`,{className:`flex min-w-0 flex-1 flex-col`,children:[(0,j.jsx)(`span`,{className:`truncate`,children:e.label}),e.description&&(0,j.jsx)(`span`,{className:`text-default-500 truncate text-xs`,children:e.description})]}),e.shortcut&&(0,j.jsx)(O,{shortcut:e.shortcut})]},e.id)})})]},e.name))})})})]})})})})}var A,j,M,N=e((()=>{A=t(n(),1),d(),b(),a(),S(),T(),j=i(),M=`__default__`,k.__docgenInfo={description:``,methods:[],displayName:`CommandPalette`,props:{isOpen:{required:!0,tsType:{name:`boolean`},description:``},commands:{required:!0,tsType:{name:`Array`,elements:[{name:`Command`}],raw:`Command[]`},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function P(e){return e}var F,I,L,R,z,B,V,H,U,W,G,K,q;e((()=>{d(),N(),F=i(),{expect:I,within:L}=__STORYBOOK_MODULE_TEST__,R={component:k,title:`Actions/Command Palette`,parameters:{layout:`fullscreen`}},z={isOpen:!0,commands:[{id:`goto-home`,label:`Go to Home`,description:`Navigate to the home view`,group:`Navigation`,keywords:[`start`,`index`],icon:P((0,F.jsx)(p,{className:`h-4 w-4`})),shortcut:{mod:!0,shift:!0,key:`h`},perform:()=>console.log(`goto home`)},{id:`goto-dashboard`,label:`Go to Dashboard`,description:`Open the dashboard view`,group:`Navigation`,icon:P((0,F.jsx)(u,{className:`h-4 w-4`})),perform:()=>console.log(`goto dashboard`)},{id:`theme-auto`,label:`Theme: System`,group:`Appearance`,keywords:[`auto`,`system`],icon:P((0,F.jsx)(s,{className:`h-4 w-4`})),perform:()=>console.log(`theme auto`)},{id:`theme-light`,label:`Theme: Light`,group:`Appearance`,icon:P((0,F.jsx)(c,{className:`h-4 w-4`})),shortcut:{mod:!0,alt:!0,key:`l`},perform:()=>console.log(`theme light`)},{id:`theme-dark`,label:`Theme: Dark`,group:`Appearance`,icon:P((0,F.jsx)(f,{className:`h-4 w-4`})),perform:()=>console.log(`theme dark`)},{id:`logout`,label:`Log out`,description:`End the current session`,group:`Account`,icon:P((0,F.jsx)(o,{className:`h-4 w-4`})),perform:()=>console.log(`logout`)}],onClose:()=>console.log(`onClose`)},B={args:z},V={args:{...z,commands:[]}},H={args:z,globals:{viewport:{value:`iphonex`}}},U={args:z,play:async({userEvent:e})=>{let t=L(document.body),n=t.getByTestId(`command-palette__search`);await e.type(n,`home`),await I(t.getByTestId(`command-palette__item-goto-home`)).toBeInTheDocument(),await I(t.queryByTestId(`command-palette__item-logout`)).not.toBeInTheDocument()}},W={args:z,play:async({userEvent:e})=>{let t=L(document.body),n=t.getByTestId(`command-palette__search`);await e.type(n,`zzz`),await I(t.getByText(`No commands found`)).toBeInTheDocument()}},G={args:z,play:async({userEvent:e})=>{let t=L(document.body).getByTestId(`command-palette__item-goto-dashboard`);await I(t).toBeInTheDocument(),await e.click(t)}},K={args:z,play:async({userEvent:e})=>{let t=L(document.body).getByTestId(`command-palette__search`);await e.click(t),await e.keyboard(`{ArrowDown}`),await e.keyboard(`{ArrowUp}`),await e.keyboard(`{Home}`),await e.keyboard(`{End}`),await e.keyboard(`{Enter}`)}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    commands: []
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    userEvent
  }) => {
    const body = within(document.body);
    const input = body.getByTestId("command-palette__search");
    await userEvent.type(input, "home");
    await expect(body.getByTestId("command-palette__item-goto-home")).toBeInTheDocument();
    await expect(body.queryByTestId("command-palette__item-logout")).not.toBeInTheDocument();
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    userEvent
  }) => {
    const body = within(document.body);
    const input = body.getByTestId("command-palette__search");
    await userEvent.type(input, "zzz");
    await expect(body.getByText("No commands found")).toBeInTheDocument();
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    userEvent
  }) => {
    const body = within(document.body);
    const item = body.getByTestId("command-palette__item-goto-dashboard");
    await expect(item).toBeInTheDocument();
    await userEvent.click(item);
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    userEvent
  }) => {
    const body = within(document.body);
    const input = body.getByTestId("command-palette__search");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowUp}");
    await userEvent.keyboard("{Home}");
    await userEvent.keyboard("{End}");
    await userEvent.keyboard("{Enter}");
  }
}`,...K.parameters?.docs?.source}}},q=[`Default`,`Empty`,`Phone`,`Search`,`EmptySearch`,`ClickCommand`,`KeyboardNavigation`]}))();export{G as ClickCommand,B as Default,V as Empty,W as EmptySearch,K as KeyboardNavigation,H as Phone,U as Search,q as __namedExportsOrder,R as default};