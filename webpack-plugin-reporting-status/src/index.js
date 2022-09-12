const PLUGINNAME = 'reportingStatus'

class ReportingStatusPlugin {
  constructor(params) {
    this.apiPath = params.apiPath
  }
  apply(compiler) {
    compiler.hooks.done.tap(PLUGINNAME, (stats) => {
      let result = stats.toJson();
      const chunks = result.chunks.map((item) => ({
        files: item.files[0],
        size: item.size
      }))

      const {
        hash,
        version,
        time,
        builtAt,
        warnings,
        errors,
      } = result
      const r = {
        hash,
        version,
        time,
        builtAt,
        chunks,
        warnings,
        errors
      }
      console.log(r);
      console.log('上报接口为：', this.apiPath);
    })
  }
}
module.exports = ReportingStatusPlugin