const link = (text, src) => `<a href=${src} target="_blanket" >${text}</a>`;
const docTpl = (name, synopsis, description) => (`
    NAME
        ${name}
        
    SYNOPSIS
        ${synopsis}
        
    DESCRIPTION
        ${description}`).replace(/</g, '&lt;');

export {
    link,
    docTpl
};