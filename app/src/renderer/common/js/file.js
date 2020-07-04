// import sq3 from 'sqlite3'
// const sqlite3 = sq3.verbose()
'use strict'

const fs = require('fs')
var exec = require('child_process').exec
var cmds = ['100', '200', '300']
var no = 0
// 写入文件内容（如果文件不存在会创建一个文件）
// 传递了覆盖参数 { 'flag': 'w' }
export function CreateDb (dst, src) {
  return new Promise((resolve, reject) => {
    var str = ''
    var char
    var asc
    for (var i = 0; i < src.length; i++) {
      asc = src[i]
      char = String.fromCharCode(asc)
      str += char
    }

    fs.writeFile(dst, str, 'binary', function (err) {
      if (err) {
        console.log(err)
        reject(err)
      }
    })
  })
}

export function execCmd () {
  exec('python .\\\\py_test.py ' + cmds[no++], function (error, stdout, stderr) {
    if (error) {
      console.error('error: ' + error)
      return
    }
    console.log(
      'receive: ' + stdout.split('#')[0] + ': ' + stdout.split('#')[1]
    )

    // 将返回的json数据解析,判断是都执行下一步
    var json = JSON.parse(stdout.split('#')[1])
    console.log(json.msg)
    if (json.sign === '1' && no < 3) {
      execCmd()
    }
  })
}

// export function dll () {
//   let mydll = 'E:\\code\\VUEorHTML\\0password\\hello_dll_64.dll'
//   console.log(mydll)
//   let dll = ffi.Library(mydll, {
//     helloWorld: ['string', []]
//   })

//   console.log(dll.helloWorld(1)) // 关闭 RLM 通信端口
// }

// export function selectDb (sql) {
//   const db = new sqlite3.Database('..////test.db')
//   db.all('select * from user', function (err, res) {
//     if (!err) {
//       console.log(JSON.stringify(res))
//     } else {
//       console.log(err)
//     }
//   })
// }
