
var Windranger = {

  getData: function () {

    var _this = this;
    this.sendMessageBack('getData', {}, function (res) {
      console.log(res);
      if (res.status == 0) {
        var siteList = res.siteList;
        var host = res.host;
        var port = res.port;
        // 显示站点列表
        var _html = ['<ul class="content-right-list">'];
        for (var i in siteList) {
          var item = '<li class="content-right-list-item content-right-list-item-interactive"><span class="content-right-list-item-text">' + siteList[i] + '</span><span class="content-right-list-item-del" data-site="' + siteList[i] + '">X</span></li>';
          _html.push(item)
        }
        _html.push('</ul>');
        $('#site_list').html(_html.join(''));
        // 显示host
        $('#host').val(host);
        // 显示port
        $('#port').val(port);
        // 监听删除
        _this.listen.siteDel();
      }
    });
  },

  listen: {
    save: function () {
      // 保存server
      $('#save_server').click(function () {
        var host = $.trim($('#host').val());
        var port = $.trim($('#port').val());

        if (!host || !port) {
          alert('host和port都不能为空');
          return false;
        }
        Windranger.sendMessageBack('saveServer', {
          'host': host,
          'port': port
        }, function (res) {
          alert(res.msg);
        });
      });

      $('#cancle_server').click(function() {
        alert('已断开');
      });

      // 保存站点
      $('#save_site').click(function () {
        var site = $.trim($('#site').val());
        if (!site) {
          return false;
        }

        Windranger.sendMessageBack('saveSite', {
          'site': site
        }, function (res) {
          if (res.status == 0) {
            Windranger.getData();
          }
          alert(res.msg);
        });
      });
    },

    siteDel: function () {
      $('.content-right-list-item-del').unbind('click').click(function () {

        if (confirm('确定要删除该记录吗？')) {
          var self = $(this);
          var site = $(this).attr('data-site');
          if (!site) {
            alert('数据有误，请刷新重试');
            return false;
          }

          Windranger.sendMessageBack('delSite', {
            'site': site
          }, function (res) {
            if (res.status != 0) {
              alert(res.msg);
              return false;
            }

            self.parent().fadeOut(function () {
              $(this).remove();
            });
          });
        }
      });
    },

    changeStyle: function() {
      $('#cancle_server').hover(function() {
        $('#save_server').css({
          "width": "40px",
          "background-color": "#63c78a",
          "border-color": "#63c78a",
          "color": '#fff',
          "font-size": "7px",
          "padding-left": "0px",
          "padding-right": "0px",
          "transition-duration": "400ms"
        });
        $('#cancle_server').css({
          "width": "150px",
          "background-color": "#ec5c57",
          "border-color": "#ec5c57",
          "color": "#fff",
          "transition-duration": "400ms",
        });
      }, function() {
        $('#save_server').css({
          "width": "95px",
          "margin-top": "15px",
          "background-color": "#e2e2e2",
          "border-radius": "6px",
          "border-style": "none",
          "cursor": "pointer",
          "font-size": "14px",
          "font-weight": "bold",
          "line-height": "20px",
          "padding": "6px 16px",
          "position": "absolute",
          "left": "0px",
          "text-align": "center",
          "white-space": "nowrap",  
          "color": "#63c78a",
          "display": "block",
          "transition-duration": "400ms",
          "float": "left",
        });

        $('#cancle_server').css({
          "width": "95px",
          "margin-top": "15px",
          "background-color": "#e2e2e2",
          "border-radius": "6px",
          "border-style": "none",
          "cursor": "pointer",
          "font-size": "14px",
          "font-weight": "bold",
          "line-height": "20px",
          "padding": "6px 16px",
          "position": "absolute",
          "right": "0px",
          "text-align": "center",
          "white-space": "nowrap",  
          "color": "#ec5c57",
          "display": "block",
          "transition-duration": "400ms",
          "float": "left",
        });
      });

      $('#save_server').hover(function () {
        $('#save_server').css({
          "width": "150px",
          "background-color": "#63c78a",
          "border-color": "#63c78a",
          "color": "#fff",
          "transition-duration": "400ms",
        });
        $('#cancle_server').css({
          "width": "40px",
          "background-color": "#ec5c57",
          "border-color": "#ec5c57",
          "color": '#fff',
          "font-size": "7px",
          "padding-left": "0px",
          "padding-right": "0px",
          "transition-duration": "400ms"
        });
      }, function() {
        $('#cancle_server').css({
          "width": "95px",
          "margin-top": "15px",
          "background-color": "#e2e2e2",
          "border-radius": "6px",
          "border-style": "none",
          "cursor": "pointer",
          "font-size": "14px",
          "font-weight": "bold",
          "line-height": "20px",
          "padding": "6px 16px",
          "position": "absolute",
          "right": "0px",
          "text-align": "center",
          "white-space": "nowrap",  
          "color": "#ec5c57",
          "display": "block",
          "transition-duration": "400ms",
          "float": "left",
        });

        $('#save_server').css({
          "width": "95px",
          "margin-top": "15px",
          "background-color": "#e2e2e2",
          "border-radius": "6px",
          "border-style": "none",
          "cursor": "pointer",
          "font-size": "14px",
          "font-weight": "bold",
          "line-height": "20px",
          "padding": "6px 16px",
          "position": "absolute",
          "left": "0px",
          "text-align": "center",
          "white-space": "nowrap",  
          "color": "#63c78a",
          "display": "block",
          "transition-duration": "400ms",
          "float": "left",
        });
      });
    },


      // }, function() {
      //   $('#cancle_server').css({
      //     "width": "95px",
      //     "margin-top": "15px",
      //     "background-color": "#e2e2e2",
      //     "border-radius": "6px",
      //     "border-style": "none",
      //     "cursor": "pointer",
      //     "font-size": "14px",
      //     "font-weight": "bold",
      //     "line-height": "20px",
      //     "padding": "6px 16px",
      //     "position": "absolute",
      //     "right": "0px",
      //     "text-align": "center",
      //     "white-space": "nowrap",  
      //     "color": "#ec5c57",
      //     "display": "block",
      //     "transition-duration": "400ms",
      //     "float": "left",
      //   });
      // });
    // }
  },

  /**
   * 向background发送消息
   * @param method
   * @param data
   * @param callback
   */
  sendMessageBack: function (method, data, callback) {
    chrome.extension.sendRequest({ 'method': method, 'data': data }, callback);
  },

  init: function () {
    // 请求初始数据
    this.getData();
    // 监听
    this.listen.save();
    this.listen.changeStyle();
  }
};

Windranger.init();
