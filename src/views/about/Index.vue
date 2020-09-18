<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-09-14 09:47:28
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-18 13:51:53
-->
<template>
  <div class="wrap-index">
    <NavBar current="" />
    <div class="content">
      <div class="title">磐安云创简介</div>
      <div class="description">
        <h2>基本信息</h2>
        <p class="line">北京磐安云创科技有限公司，其前身为业内著名的提供软件业务系统生命周期领域解决方案及服务的公司。在面向国内广大用户提供世界一流的企业级核心软件产品与服务的理念下，我们先后与<span class="point">Micro Focus软件、IBM软件、CA、Borland、Quest</span>等国际知名的IT企业结为战略合作伙伴关系。</p>
        <h2>产品及解决方案</h2>
        <p class="line">长期以来，我们专注于业务系统生命周期（需求管理、配置管理、功能及性能测试、安全扫描、运维监控及自动化）领域，整合相关先进产品，提供多层次的全面高端服务。</p>
        <p class="line"><span class="point">软件测试产品及其解决方案</span>的全面服务，是我们磐安云创的核心业务。我们是全球领先的软件质量解决方案提供商Micro Focus的全面合作伙伴。提供建立在Micro Focus质量和性能中心基础上的质量保障产品和解决方案，是我们的核心价值。</p>
        <p class="line">我们专注于软件测试领域，以一流的技术和管理，提升客户软件系统的成功率和质量，体现专业服务价值。为众多的行业客户和大型项目提供专业的测试产品和和测试服务。业务覆盖军队、教育、石油、电力、金融、税务及政府等行业，积累了丰富的测试产品支持经验、测试方法论和最佳实践。</p>
        <p class="line">作为专业测试产品及解决方案提供者，我们一直站在测试技术的前沿。无论在性能测试与调优、自动测试、构件化测试、业务驱动测试，以及各类测试工具的使用方面，都具有强大的实力。我们吸收和发展了全面的测试管理体系, 成熟的体系就是高质量服务的保证。</p>
        <p class="line"><span class="point">软件运维产品及其解决方案</span>的是我们磐安云创的另一个核心业务。我们整合资源，可以提供从基础设施监控、业务可用性监控、数据中心自动化等</p>
        <p class="line">我们的方案可以将IT基础设施和关键业务交易关联起来，建立映射，在业务系统出现可用性或者性能问题的时候，助力快速定位问题和高效率排障，降低运维成本</p>
        <p class="line">在当前的云计算、物联网和大数据的IT发展趋势中，通过运维数据分析机制，我们关注一个更为敏捷、智能、自动化的运维体系，帮助客户实现私有云/混合云的高质量服务和高安全保障。</p>
        <p class="line">除此之外，我们还在开发测试Paas云平台、大数据分析基础设施、网络安全扫描等方面具备产品提供和技术支持能力。</p>
        <h2>核心团队</h2>
        <p class="line">磐安云创拥有一支朝气蓬勃、经验丰富、团结上进的技术团队。其中的技术骨干为曾服务于国内外知名IT公司的资深人士，具有深厚的管理和技术背景。由于长期从事国内应用领域的大型软件系统建设，在金融、电信、税务等领域具有深厚的业务背景，并对系统生命周期领域有着深刻的理解，在行业内有良好声誉。他们平均拥有超过8年的咨询顾问或交付服务经验，精通主流的测试、运维工具。拥有多位原厂认证工程师。团队带头人为国内多个软件评测中心、电子信息产品监督检验院的特聘顾问，并曾出版相关技术专著。</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'

export default {
  components: {
    NavBar
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.content{
  background: #ffffff;
  padding-left: 30px;
  padding-bottom: 40px;
  box-sizing: border-box;
}
h2{
  margin-top: 20px;
  text-decoration: underline;
}
.title{
  font-size: 26px;
  text-align: center;
  padding: 25px 0;
}

.description{
  padding: 30px;
  box-sizing: border-box;
}
.line{
  text-indent: 32px;
  font-size: 16px;
  margin-top: 10px;
  line-height: 26px;
}
.point{
  font-weight: 600;
}
</style>