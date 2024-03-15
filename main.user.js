// ==UserScript==
// @name        CommentForm Autoclicker
// @namespace   https://github.com/Enthub-it
// @match       https://enthub.it/*
// @grant       none
// @version     1.0.0
// @author      TentacleTenticals
// @description Автокликер формы написания комментариев
// @homepage    https://github.com/Enthub-it/CommentForm-Autoclicker/
// @updateURL   https://github.com/Enthub-it/CommentForm-Autoclicker/raw/main/main.user.js
// @downloadURL https://github.com/Enthub-it/CommentForm-Autoclicker/raw/main/main.user.js
// ==/UserScript==

(() => {
  console.log('[Test]');

  function clicker(btn){
    let el;
    function check(e){
        return new Promise((res, err) => {
            let trying = 0;
            const timer = setInterval(() => {
                trying++;
                const form = e.parentNode.nextElementSibling.querySelector(`textarea[wire\\:model="replyState.comment"]`);
                //console.log(form);
                if(form){
                    console.log('[Check] Form founded!');
                    clearInterval(timer);
                    res({app:'[Check]', status:'success', data:form});
                }else
                if(trying === 5){
                    console.log('[Check] Form not founded, tryings is out!');
                    clearInterval(timer);
                    err({app:'[Check]', status:'fail'});
                }
            }, 500);
        })
    };
    //btn.click();

    check(btn).then(
        res => {
            console.log(res);
            res.data.focus()
        }
    );
  }

  document.onmousedown = (e) => {
    //console.log(e.target);
    if(e.target.nodeName !== 'SPAN') return;
    if(!e.target.textContent.match('Ответить')) return //console.log(e.target);
    const btn = e.target.closest(`button[wire\\:click="$toggle('isReplying')"]`);
    console.log(btn);
    if(btn) clicker(btn);
  }

})();
