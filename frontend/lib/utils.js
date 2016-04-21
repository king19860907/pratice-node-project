import marked from 'marked';

export function redirectUrl(url){
    location = url;
}

export function renderMarkdown(text){
    return marked(text);
}