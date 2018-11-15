const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);
const goto = (url) => {
    let $tmpLink = document.createElement('a');
    $tmpLink.href = url || 'about:blanket';
    $tmpLink.target = '_blanket';
    $tmpLink.click();
    $tmpLink = null;
};
export {$, $$, goto};
