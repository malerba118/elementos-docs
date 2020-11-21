import React from 'react';
import Highlight, { defaultProps } from "prism-react-renderer";
import vsDark from "prism-react-renderer/themes/vsDark"


const Editor = ({ code, language = 'jsx' }) => (
    <Highlight {...defaultProps} code={code} language={language} theme={vsDark}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{...style, fontSize: '.92rem'}} >
            {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
                ))}
            </div>
            ))}
        </pre>
        )}
    </Highlight>
)

export default Editor