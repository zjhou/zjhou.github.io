const title = ({title, _id}) =>
    `<span class="command" data-cmd="cat ${title} | tohtml" data-id="${_id}">${title}</span>`;

export {title};