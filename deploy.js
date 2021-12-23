const fs = require('fs')
const path = require('path')
const {NodeSSH} = require('node-ssh')
 
const ssh = new NodeSSH()

// 连接
ssh.connect({
  host: '120.79.209.217',
  username: 'root',
  privateKey: 'C:\\Users\\weng\\.ssh\\id_rsa'
})
.then(function() {
  console.log('连接成功')
 
  // Putting entire directories
  const failed = []
  const successful = []
  // 把本地目录中的所有文件。上传到指定服务器中的目录中去
  let site_dir = "./dist/";
  let server_site_dir = "/www/wwwroot/wengzijia.top";
  ssh.putDirectory(site_dir, server_site_dir, {
    recursive: true,
    concurrency: 10,
    // ^ WARNING: Not all servers support high concurrency
    // try a bunch of values and see what works on your server
    validate: function(itemPath) {
      const baseName = path.basename(itemPath)
      // 忽略哪些文件不能上传到服务器
        let noAllowUpload = ['package-lock.json','deploy.js','package.json'];
    //   console.log(baseName)
      if(noAllowUpload.includes(baseName)){
        // 返回false则不上传，true则上传
        return false;
      }
      // 除开node_modules目录和以.开头的文件都要上传
      return baseName.substr(0, 1) !== '.' && // do not allow dot files
             baseName !== 'node_modules' // do not allow node_modules
    },
    tick: function(localPath, remotePath, error) {
      if (error) {
        failed.push(localPath)
      } else {
        successful.push(localPath)
      }
    }
  }).then(function(status) {


   
    // console.log('the directory transfer was', status ? 'successful' : 'unsuccessful')
    // console.log('failed transfers', failed.join(', '))
    console.log('successful transfers', successful.join('\n '))

    process.exit();
  })
})