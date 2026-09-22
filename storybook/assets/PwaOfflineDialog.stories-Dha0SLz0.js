import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,r as n,t as r}from"./iframe-CvRYsGbX.js";import{G as i,it as a,t as o}from"./dist-BNyvRpVM.js";import{c as s,i as c,t as l}from"./src-CsumF9Yf.js";function u(e,t){return[e.formatMessage({description:`PwaOfflineDialog: toast - ready to work offline`,defaultMessage:`Ready to work offline`,id:`Q9Hkx1`}),{onClose:t}]}var d=e((()=>{})),f,p,m,h,g,_;e((()=>{o(),l(),r(),d(),f=n(),{expect:p,within:m}=__STORYBOOK_MODULE_TEST__,h={title:`Feedback/PWA Offline`,decorators:[s,c]},g={render:()=>{let e=t();return(0,f.jsx)(a,{onPress:()=>{let[t,n]=u(e,()=>console.log(`onClose`));i(t,n)},children:`Show Toast`})},play:async({canvas:e,userEvent:t})=>{await t.click(e.getByRole(`button`,{name:`Show Toast`}));let n=m(document.body);await p(await n.findByText(/ready to work offline/i)).toBeInTheDocument()}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const intl = useIntl();
    return <Button onPress={() => {
      const [msg, opts] = PwaOfflineDialogProps(intl, () => console.log("onClose"));
      toast(msg, opts);
    }}>
        Show Toast
      </Button>;
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: "Show Toast"
    }));
    const body = within(document.body);
    await expect(await body.findByText(/ready to work offline/i)).toBeInTheDocument();
  }
}`,...g.parameters?.docs?.source}}},_=[`OfflineDialog`]}))();export{g as OfflineDialog,_ as __namedExportsOrder,h as default};