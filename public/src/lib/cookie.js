class Cookie {
  static set = (key, value, expiresTime) => {
      //默认保存时间
      var time = expiresTime;
      //获取当前时间
      var cur = new Date();
      //设置指定时间
      cur.setTime(cur.getTime()+time*1000);
      //创建cookie  并且设置生存周期为GMT时间
      document.cookie = key+'='+encodeURIComponent(value)+';expires='+(time===undefined?'':cur.toGMTString());
  }
  static get = (key) => {
      //获取cookie
      var data = document.cookie;
      //获取key第一次出现的位置pwd=
      var startIndex = data.indexOf(key+'=');
      // name=123;pwd=abc
      //如果开始索引值大于0表示有cookie
      if(startIndex>-1) {
          //key的起始位置等于出现的位置加key的长度+1
          startIndex = startIndex+key.length+1;
          //结束位置等于从key开始的位置之后第一次;号所出现的位置
          var endIndex = data.indexOf(';',startIndex);
          //如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
          endIndex = endIndex<0 ? data.length:endIndex;
          return decodeURIComponent(data.substring(startIndex,endIndex));
      }else {
          return '';
      }
  }
  static delete = (name) => {
    Cookie.set(name, '', -1)
  }
}

export default Cookie
