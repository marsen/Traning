using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Massembly
{
    public class ValidateCode
    {
        /// <summary>
        /// 產生圖形驗證
        /// </summary>
        /// <param name="code"> 傳出驗證碼。 </param>
        /// <param name="codeLength"> 驗證碼字元數。 </param>
        /// <param name="width">圖寬。</param>
        /// <param name="height">圖高。</param>
        /// <param name="fontSize">字體大小。</param>
        private static Bitmap CreateValidateCodeImage(ref string code, int codeLength, int width, int height, int fontSize)
        {
            string sCode = string.Empty;
            //顏色列表，用於驗證碼、噪線、噪點
            Color[] oColors = {
                   Color .Black,
                   Color .Red,
                   Color .Blue,
                   Color .Green,
                   Color .Orange,
                   Color .Brown,
                   Color .Brown,
                   Color .DarkBlue
            };
            //字體列表，用於驗證碼
            string[] oFontNames = {
                   "Curlz MT",
                   "Algerian",
                   "Snap ITC",
                   "Castellar",
                   "Times New Roman" ,
                   "MS Mincho" ,
                   "Book Antiqua" ,
                   "Gungsuh" ,
                   "PMingLiU" ,
                   "Impact"
            };
            //驗證碼的字元集，去掉了一些容易混淆的字元
            char[] oCharacter = {
                   '2' ,
                   '3' ,
                   '4' ,
                   '5' ,
                   '6' ,
                   '8' ,
                   '9' ,
                   'A' ,
                   'B' ,
                   'C' ,
                   'D' ,
                   'E' ,
                   'F' ,
                   'G' ,
                   'H' ,
                   'J' ,
                   'K' ,
                   'L' ,
                   'M' ,
                   'N' ,
                   'P' ,
                   'R' ,
                   'S' ,
                   'T' ,
                   'W' ,
                   'X' ,
                   'Y'
            };
            Random oRnd = new Random();
            int n1;
            Point oPoint1 = default(Point);
            Point oPoint2 = default(Point);

            //生成驗證碼字串
            for (n1 = 0; n1 <= codeLength - 1; n1++)
            {
                sCode += oCharacter[oRnd.Next(oCharacter.Length)];
            }

            Bitmap oBmp = new Bitmap(width, height);
            Graphics oGraphics = Graphics.FromImage(oBmp);
            oGraphics.Clear(Color.White);
            try
            {
                Color oColor;
                for (n1 = 0; n1 <= 40; n1++)
                {
                    //畫噪線
                    oPoint1.X = oRnd.Next(width);
                    oPoint1.Y = oRnd.Next(height);
                    oPoint2.X = oRnd.Next(width);
                    oPoint2.Y = oRnd.Next(height);
                    oColor = oColors[oRnd.Next(oColors.Length)];
                    oGraphics.DrawLine(new Pen(oColor), oPoint1, oPoint2);
                }

                for (n1 = 0; n1 <= sCode.Length - 1; n1++)
                {
                    //畫驗證碼字串
                    string sFontName = oFontNames[oRnd.Next(oFontNames.Length)];
                    Font oFont = new Font(sFontName, fontSize, FontStyle.Italic);
                    oColor = oColors[oRnd.Next(oColors.Length)];
                    oGraphics.DrawString(sCode[n1].ToString(), oFont, new SolidBrush(oColor),
                        Convert.ToSingle(n1) * fontSize + 10, Convert.ToSingle(8));
                }

                for (int i = 0; i <= 30; i++)
                {
                    //畫噪點
                    int x = oRnd.Next(oBmp.Width);
                    int y = oRnd.Next(oBmp.Height);
                    Color clr = oColors[oRnd.Next(oColors.Length)];
                    oBmp.SetPixel(x, y, clr);
                }

                code = sCode;
                return oBmp;
            }
            finally
            {
                oGraphics.Dispose();
            }
        }

        /// <summary>
        /// 產生圖形驗證碼。
        /// </summary>
        /// <param name="memoryStream"> 記憶體資料流。 </param>
        /// <param name="code"> 傳出驗證碼。 </param>
        /// <param name="codeLength"> 驗證碼字元數。 </param>
        /// <param name="width"> 圖寬。 </param>
        /// <param name="height"> 圖高。 </param>
        /// <param name="fontSize"> 字體大小。 </param>
        public static void CreateValidateCodeImage(ref MemoryStream memoryStream, ref string code, int codeLength, int width, int height, int fontSize)
        {
            Bitmap oBmp = CreateValidateCodeImage(ref code, codeLength, width, height, fontSize);
            try
            {
                oBmp.Save(memoryStream, ImageFormat.Png);
            }
            finally
            {
                oBmp.Dispose();
            }
        }
    }
}
