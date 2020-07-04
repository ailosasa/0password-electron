<template>
  <div class="wrapper">
    <div class="safe">
      <Button class="safebutton"
              long
              type="primary">
        <Row>
          <Col span="6">
          <i class="iconfont1 el-icon-s-help"></i>
          </Col>
          <Col span="18"
               class="leftbarfont">
          <li style="list-style-type: none">
            所有保险库
          </li>
          <li style="list-style-type: none">
            1保险库
          </li>
          </Col>
        </Row>
      </Button>
    </div>
    <div class="Favorites">
      <article>
        </br>
      </article>
      <Row>
        <Button class="safebutton"
                long
                type="primary">
          <Row>
            <Col span="6">
            <i class="iconfont2 el-icon-s-grid"></i>
            </Col>
            <Col span="18"
                 class="leftbarfont">
            所有项目
            </Col>
          </Row>

        </button>
      </Row>
      <row>
        <Button class="safebutton"
                long
                type="primary">
          <Row>
            <Col span="6">
            <i class="iconfont2 el-icon-star-on"></i>
            </Col>
            <Col span="18"
                 class="leftbarfont">
            收藏夹
            </Col>
          </Row>
        </button>
      </row>

    </div>
    <div class="category">
      <article class="leftbarfont"
               style="padding: 15px">
        类别
      </article>
      <Button class="
               safebutton"
              long
              type="primary">
        <Row>
          <Col span="6">
          <i class="iconfont2 el-icon-unlock"></i>
          </Col>
          <Col span="18"
               class="leftbarfont">
          登陆信息
          </Col>
        </Row>
      </button>
    </div>
  </div>
</template>


<style lang="less" scoped>
.wrapper {
  height: 100%;
  overflow-y: auto;
  background-color: #394658;
}
.safebutton {
  background-color: #394658;
  border: 0ch;
}
.iconfont1 {
  font-size: 48px;
}
.iconfont2 {
  font-size: 20px;
}
.leftbarfont {
  font-size: 14px;
  color: #ffffff;
}
// .category {
//   padding: 10px;
// }
</style>