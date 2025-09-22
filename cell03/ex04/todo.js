const $list = $('#ft_list');

function setCookie(name,val,days){
  const d=new Date(); d.setTime(d.getTime()+days*24*60*60*1000);
  document.cookie=`${name}=${encodeURIComponent(val)};expires=${d.toUTCString()};path=/`;
}
function getCookie(name){
  return document.cookie.split('; ').map(s=>s.split('=')).find(([k])=>k===name)?.[1] ? decodeURIComponent(
    document.cookie.split('; ').map(s=>s.split('=')).find(([k])=>k===name)[1]
  ) : null;
}
function save(){
  const arr = $list.children('.todo').map(function(){return $(this).text();}).get();
  setCookie('todos', JSON.stringify(arr), 7);
}
function addTodo(text, toTop){
  const $item = $('<div class="todo"></div>').text(text).on('click', function(){
    if(confirm('Do you want to remove this TODO?')){ $(this).remove(); save(); }
  });
  toTop && $list.children().length ? $item.prependTo($list) : $item.appendTo($list);
}

$(function(){
  const saved=getCookie('todos'); if(saved){ try{ JSON.parse(saved).forEach(t=>addTodo(t,false)); }catch{} }
  $('#newBtn').on('click', function(){
    const t=prompt('Enter a new TODO:'); if(t && t.trim()!==''){ addTodo(t.trim(), true); save(); }
  });
});

