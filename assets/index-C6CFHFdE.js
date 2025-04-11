import{g as j,r as v,d as r,j as e,a as t,z as g,S as k}from"./index-DqM-8yz0.js";var C=v();const y=j(C),w=r.div`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`,f=({label:n,children:s})=>e.jsxs(S,{children:[e.jsx(E,{children:n}),s]}),S=r.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`,E=r.label`
  font-size: 14px;
  color: #888;
  margin-bottom: 4px;
`,z=t.memo(({onCancel:n})=>e.jsxs(D,{children:[e.jsx(R,{type:"submit",children:"Create"}),e.jsx(F,{type:"button",onClick:n,children:"Cancel"})]})),D=r.div`
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 24px;
`,R=r.button`
  background-color: #2f80ed;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #1c6dd0;
  }
`,F=r.button`
  background: none;
  border: none;
  color: #444;
  font-weight: bold;
  cursor: pointer;
  padding: 10px 20px;
`,B=t.forwardRef(({value:n,onChange:s},a)=>e.jsx(q,{ref:a,value:n,onChange:s})),q=r.input`
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
`,M=g.object({name:g.string().min(1,"Name is required").regex(/^[a-zA-Z]+$/,"Only English alphabetical characters are allowed")}),N=({isOpen:n,onClose:s,onCreate:a})=>{const[c,l]=t.useState(""),[i,d]=t.useState("Working"),[u,x]=t.useState(null),p=t.useRef(null),m=t.useCallback(()=>{l(""),d("Working"),x(null)},[]);t.useEffect(()=>{n&&(m(),requestAnimationFrame(()=>{var o;(o=p.current)==null||o.focus()}))},[n,m]);const b=t.useCallback(()=>{const o=M.safeParse({name:c});if(!o.success){x(o.error.errors[0].message);return}a({name:o.data.name,status:i}),s()},[c,i,a,s]),h=t.useCallback(o=>{o.preventDefault(),b()},[b]);return n?y.createPortal(e.jsx(T,{children:e.jsx(W,{children:e.jsxs("form",{onSubmit:h,children:[e.jsx(A,{children:"Create New User"}),e.jsx(I,{}),e.jsxs(f,{label:"User name:",children:[e.jsx(B,{ref:p,value:c,onChange:o=>l(o.target.value)}),u&&e.jsx(w,{children:u})]}),e.jsx(f,{label:"Status:",children:e.jsx(k,{status:i,onChange:d})}),e.jsx(z,{onCancel:s})]})})}),document.body):null};t.memo(N);const T=r.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,W=r.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`,A=r.h2`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 20px;
`,I=r.div`
  height: 1px;
  background-color: #d4d4d4;
  margin: 24px -24px;
`;export{N as CreateEmployeeModal};
