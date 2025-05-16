export const logger = (req, res, next) => {
    console.log(`📢 ${req.method} ${req.url}`);
  
    res.on("finish", () => {
      if (res.statusCode >= 400) {
        console.log(`❌ Error ${res.statusCode}\n`);
      } else {
        console.log(`✅ Respuesta enviada con código ${res.statusCode}\n`);
      }
    });
  
    next();
  };
  