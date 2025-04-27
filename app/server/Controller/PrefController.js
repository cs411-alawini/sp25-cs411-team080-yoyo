const carModel = require('../Model/carModel');

exports.getPref = async (req, res) => {
    
    const { source,minAge, maxAge,location } = req.body;
    if(source=='preference')
    {
        try {
            const prefs = await carModel.getSale_ByAge_Loc(location, minAge, maxAge);
            console.log("prefs:", prefs);
          
            // 成功响应：添加 success: true，并用 data 包裹实际数据
            res.json({
              success: true,
              data: prefs  // 原始数据放在 data 字段中
            });
          
          } catch (err) {
            console.error('Read preference Data Fail:', err);
          
            // 失败响应：添加 success: false，并返回错误信息
            res.status(500).json({
              success: false,
              error: 'Server Error',
            });
          }
    }
    
  
};


