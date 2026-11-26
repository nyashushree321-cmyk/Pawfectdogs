import re,glob
VOID={'meta','link','input','br','img','hr'}
def fmt_html(src):
    toks=[t for t in re.split(r'(<!--.*?-->|<[^>]+>)',src,flags=re.S) if t and t.strip()]
    toks=[t.strip() if not t.startswith('<') else t for t in toks]
    def kind(t):
        if not t.startswith('<'):return 'text',None
        if t.startswith('<!'):return 'void',None
        m=re.match(r'</?\s*([a-zA-Z0-9]+)',t);n=m.group(1).lower()
        if t.startswith('</'):return 'close',n
        if n in VOID or t.endswith('/>'):return 'void',n
        return 'open',n
    out=[];d=0;i=0
    while i<len(toks):
        k,n=kind(toks[i])
        if k=='open':
            # open + text + close  /  open + close
            if i+2<len(toks) and kind(toks[i+1])[0]=='text' and kind(toks[i+2])==('close',n):
                out.append('  '*d+toks[i]+toks[i+1]+toks[i+2]);i+=3;continue
            if i+1<len(toks) and kind(toks[i+1])==('close',n):
                out.append('  '*d+toks[i]+toks[i+1]);i+=2;continue
            out.append('  '*d+toks[i]);d+=1
        elif k=='close':
            d=max(d-1,0);out.append('  '*d+toks[i])
        else:out.append('  '*d+toks[i])
        i+=1
    return '\n'.join(out)+'\n'
def fmt_css(src):
    out=[];d=0
    for m in re.finditer(r'([^{};]+)\{|([^{};]+;?)|\}',src):
        if m.group(1):out.append('  '*d+m.group(1).strip()+' {');d+=1
        elif m.group(2):
            if m.group(2).strip():
                s=m.group(2).strip();s=s if s.endswith(';') else s+';'
                out.append('  '*d+s)
        else:
            d=max(d-1,0);out.append('  '*d+'}')
            if d==0:out.append('')
    return '\n'.join(out)+'\n'
for f in glob.glob('*.html'):
    t=fmt_html(open(f).read())
    open(f,'w').write(t)
t=fmt_css(open('css/style.css').read())
open('css/style.css','w').write(t)
