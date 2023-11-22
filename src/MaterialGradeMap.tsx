import {RSelectMenu} from './Lib/RSelectMenu.tsx'
import ExcelJS from 'exceljs'


const url = "https://docs.google.com/spreadsheets/d/1uCKHsgeu1TUDqvVJQ2T89dLbTLlLwSxB/export?format=xlsx";
export type Label = Record<string,string>; 

class Grade
{
    name?: string                  = "";
    density?: number               = 0;
    compressiveStrength?: number   = 0;
    tensileStrength?: number       = 0;
    shearStrength?: number         = 0;
    thermoformingTemp?: number     = 0;
    elongationAtBreak?: number     = 0;
    maxCuringTemperature?: number  = 0;
    description?: string           = "";
}

function RequestDataExcelSheet() : void
{
	var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = function() 
    {
      const arrayBuffer :ArrayBuffer = this.response;
      
      const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
      const promise: Promise<ExcelJS.Workbook> = workbook.xlsx.load(arrayBuffer);
      promise.then
      ( (i:ExcelJS.Workbook) => 
      {
        const workSheet: ExcelJS.Worksheet | undefined = i.getWorksheet();
		const rows: ExcelJS.Row[] | undefined = workSheet && workSheet.getRows(0,workSheet.rowCount);

		const titleRow: string[] = [];
		rows![3].eachCell( (cell: ExcelJS.Cell, colNumber: number) =>
		{
			titleRow.push(cell.toString());
		});

		const productRows: string[][] = [];

		for(let i = 4; i < workSheet!.rowCount; i++ )
		{
			let row: string[] = [];
			rows![i].eachCell( (cell: ExcelJS.Cell, colNumber: number) =>
			{
				row.push(cell.toString());
			});

			productRows[i - 4] = row;
		}

		console.log(titleRow);
		console.log(productRows);
		
      });
    };
    req.send();
}

export function SelectBarMaterialMap() : JSX.Element 
{
    RequestDataExcelSheet();
	
	return(
		<RSelectMenu keyNameMap={GetMaterialKeyNamePairs()}/>
	); 
}

export function GetMaterialGradeData(i_key: string) : Grade | null
{
    for (const [key, val] of Object.entries(GetMaterialGradeMap())) 
    {
        if(i_key === key)
        {
            return val;
        }
    }
    return(null)
} 

function GetMaterialKeyNamePairs() : Record<string,string>
{
    const options : Record<string,string> = {};
    for (const [key, val] of Object.entries(GetMaterialGradeMap())) 
    {
      if(key != "")
      {
        // insert
        options[key] = val.name ?? "";
      }
    }
    return(options);
}

function GetMaterialGradeMap() : Record<string,Grade>
  {
    const map: Record<string,Grade> = 
    {
          "igf31": {
            name: "Rohacell IGF 31",
            density: 32,
            compressiveStrength: 58,
            tensileStrength: 145,
            shearStrength: 58,
            thermoformingTemp: 195,
            maxCuringTemperature: 130,
            description: "<i>Industrial, medical, sport, automotive, electronics</i><br><br>Coarse/ medium base grade <BR><BR>Datasheet <a href='https://products.evonik.com/assets/35/34/ROHACELL_IG_F_2022_April_EN_243534.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",
        
          },
          "igf51": {
            name: "Rohacell IGF 51",
            density: 52,
            compressiveStrength: 217,
            tensileStrength: 275,
            shearStrength: 116,
            thermoformingTemp: 195,
            maxCuringTemperature: 130,
            description: "<i>Industrial, medical, sport, automotive, electronics</i><br><br>Coarse/ medium base grade <BR><BR>Datasheet <a href='https://products.evonik.com/assets/35/34/ROHACELL_IG_F_2022_April_EN_243534.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",
          },
          igf71: {
            name: "Rohacell IGF 71",
            density: 75,
            compressiveStrength: 130,
            tensileStrength: 406,
            shearStrength: 188,
            thermoformingTemp: 195,
            maxCuringTemperature: 130,
            description: "<i>Industrial, medical, sport, automotive, electronics</i><br><br>Coarse/ medium base grade <BR><BR>Datasheet <a href='https://products.evonik.com/assets/35/34/ROHACELL_IG_F_2022_April_EN_243534.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",
          },
          igf110: {
            name: "Rohacell IGF 110",
            density: 110,
            compressiveStrength: 435,
            tensileStrength: 507,
            shearStrength: 348,
            thermoformingTemp: 195,
            maxCuringTemperature: 130,
            description: "<i>Industrial, medical, sport, automotive, electronics</i><br><br>Coarse/ medium base grade <BR><BR>Datasheet <a href='https://products.evonik.com/assets/35/34/ROHACELL_IG_F_2022_April_EN_243534.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",
          },
          A31: {
            name: "Rohacell 31 A",
            density: 32,
            compressiveStrength: 58,
            tensileStrength: 145,
            shearStrength: 58, 
            thermoformingTemp: 0,
            elongationAtBreak: 3,
            maxCuringTemperature: 130,
           description: "Aircraft, space<br><br><i>Base grade qualified for aircraft, coarse cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/34/00/ROHACELL_A_2022_April_EN_243400.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
        
           A51: {
            name: "Rohacell 51 A",
            density: 52,
            compressiveStrength: 130,
            tensileStrength: 275,
            shearStrength: 116, 
            thermoformingTemp: 0,
            elongationAtBreak: 3,
            maxCuringTemperature: 130,
           description: "Aircraft, space<br><br><i>Base grade qualified for aircraft, coarse cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/34/00/ROHACELL_A_2022_April_EN_243400.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
           A71: {
            name: "Rohacell 71 A",
            density: 75,
            compressiveStrength: 217,
            tensileStrength: 406,
            shearStrength: 188, 
            thermoformingTemp: 0,
            elongationAtBreak: 3,
            maxCuringTemperature: 130,
           description: "Aircraft, space<br><br><i>Base grade qualified for aircraft, coarse cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/34/00/ROHACELL_A_2022_April_EN_243400.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
        SL71: {
            name: "Rohacell 71 SL",
            density: 75,
            compressiveStrength: 218,
            tensileStrength: 537,
            shearStrength: 58,
            thermoformingTemp: 200,
            elongationAtBreak: 4,
            maxCuringTemperature: 130,
            description: "Automotive, sport, industrial <br><br><i>Higher temperature and higher compressive resistance compared to IG-F, higher elongation at break</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/98/ROHACELL_SL_2022_July_EN_243398.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>", },
          SL110: {
            name: "Rohacell 110 SL",
            density: 110,
            compressiveStrength: 435,
            tensileStrength: 870,
            shearStrength: 334,
            thermoformingTemp: 200,
            elongationAtBreak: 4.7,
        maxCuringTemperature: 130,
           description: "Automotive, sport, industrial <br><br><i>Higher temperature and higher compressive resistance compared to IG-F, higher elongation at break</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/98/ROHACELL_SL_2022_July_EN_243398.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>", },
           SL200: {
            name: "Rohacell 200 SL",
            density: 205,
            compressiveStrength: 1390,
            tensileStrength: 1450,
            shearStrength: 696,
            thermoformingTemp: 200,
            elongationAtBreak: 6.3,
        maxCuringTemperature: 130,
           description: "Automotive, sport, industrial <br><br><i>Higher temperature and higher compressive resistance compared to IG-F, higher elongation at break</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/98/ROHACELL_SL_2022_July_EN_243398.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>", 
               
           },  
           SL71HT: {
            name: "Rohacell 71 SL-HT",
            density: 75,
            compressiveStrength: 218,
            tensileStrength: 537,
            shearStrength: 203,
            thermoformingTemp: 200,
            elongationAtBreak: 4,
            maxCuringTemperature: 180,
            description: "Automotive, sport, industrial <br><br><i>Higher temperature and higher compressive resistance compared to IG-F, higher elongation at break</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/98/ROHACELL_SL_2022_July_EN_243398.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>", 
        
        },
          SL110HT: {
            name: "Rohacell 110 SL-HT",
            density: 110,
            compressiveStrength: 435,
            tensileStrength: 870,
            shearStrength: 334,
            thermoformingTemp: 200,
            elongationAtBreak: 4.7,
        maxCuringTemperature: 180,
           description: "Automotive, sport, industrial <br><br><i>Higher temperature and higher compressive resistance compared to IG-F, higher elongation at break</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/98/ROHACELL_SL_2022_July_EN_243398.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>", 
        
        },
           SL200HT: {
            name: "Rohacell 200 SL-HT",
            density: 205,
            compressiveStrength: 1390,
            tensileStrength: 1450,
            shearStrength: 696,
            thermoformingTemp: 200,
            elongationAtBreak: 6.3,
        maxCuringTemperature: 170,
           description: "Automotive, sport, industrial <br><br><i>Higher temperature and higher compressive resistance compared to IG-F, higher elongation at break</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/98/ROHACELL_SL_2022_July_EN_243398.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>", 
               
           },
         
           HERO51: {
            name: "Rohacell 51 Hero",
            density: 52,
            compressiveStrength: 87,
            tensileStrength: 377,
            shearStrength: 102,
            thermoformingTemp: 180,
            elongationAtBreak: 8,
            maxCuringTemperature: 180,
           description: "Aircraft,space <br><br><i>High temperature and compressive resistance, highest elongation at break, damage tolerance, Grade for structural aerospace parts</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/35/22/ROHACELL_HERO_2022_April_EN_243522.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
        
        HERO71: {
            name: "Rohacell 71 Hero",
            density: 75,
            compressiveStrength: 160,
            tensileStrength: 595,
            shearStrength: 189,
            thermoformingTemp: 180,
            elongationAtBreak: 9.5,
        maxCuringTemperature: 180,
           description: "Aircraft,space <br><br><i>High temperature and compressive resistance, highest elongation at break, damage tolerance, Grade for structural aerospace parts</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/35/22/ROHACELL_HERO_2022_April_EN_243522.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>", 
          },
          
          HERO110: {
            name: "Rohacell 110 Hero",
            density: 110,
            compressiveStrength: 363,
            tensileStrength: 914,
            shearStrength: 334,
            thermoformingTemp: 180,
            elongationAtBreak: 9.9,
            maxCuringTemperature: 180,
            description: "Aircraft,space <br><br><i>High temperature and compressive resistance, highest elongation at break, damage tolerance, Grade for structural aerospace parts, medium cell size</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/35/22/ROHACELL_HERO_2022_April_EN_243522.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
        
        HERO200: {
            name: "Rohacell 200 Hero",
            density: 205,
            compressiveStrength: 1030,
            tensileStrength: 1780,
            shearStrength: 754,
            thermoformingTemp: 180,
            elongationAtBreak: 10.8,
            maxCuringTemperature: 180,
            description: "Aircraft,space <br><br><i>High temperature and compressive resistance, highest elongation at break, damage tolerance, Grade for structural aerospace parts, medium cell size</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/35/22/ROHACELL_HERO_2022_April_EN_243522.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
          
          RIMA51: {
            name: "Rohacell 51 Rima",
            density: 52,
            compressiveStrength: 116,
            tensileStrength: 232,
            shearStrength: 116,
            thermoformingTemp: 215,
            elongationAtBreak: 7,
            maxCuringTemperature: 130,
            description: "Aircraft, space, automotive, sport, industrial <br><br><i>High temperature and compressive resistance, highest elongation at break, damage tolerance, Grade for structural aerospace parts</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/32/67/ROHACELL_RIMA_2022_April_EN_243267.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
          },
        RIMA71: {
            name: "Rohacell 71 Rima",
            density: 75,
            compressiveStrength: 246,
            tensileStrength: 319,
            shearStrength: 188,
            thermoformingTemp: 205,
            elongationAtBreak: 7,
            maxCuringTemperature: 130,
            description: "Aircraft, space, automotive, sport, industrial <br><br><i>High temperature and compressive resistance, highest elongation at break, damage tolerance, Grade for structural aerospace parts</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/32/67/ROHACELL_RIMA_2022_April_EN_243267.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
          },
        RIMA110: {
            name: "Rohacell 110 Rima",
            density: 110,
            compressiveStrength: 522,
            tensileStrength: 536,
            shearStrength: 348,
            thermoformingTemp: 195,
            elongationAtBreak: 7,
            maxCuringTemperature: 130,
            description: "Aircraft, space, automotive, sport, industrial <br><br><i>High temperature and compressive resistance, highest elongation at break, damage tolerance, Grade for structural aerospace parts</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/32/67/ROHACELL_RIMA_2022_April_EN_243267.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
          },
          RIMA51HT: {
            name: "Rohacell 51 Rima-HT",
            density: 52,
            compressiveStrength: 116,
            tensileStrength: 232,
            shearStrength: 116,
            thermoformingTemp: 215,
            elongationAtBreak: 7,
            maxCuringTemperature: 180,
            description: "Aircraft, space, automotive, sport, industrial <br><br><i>High temperature and compressive resistance, highest elongation at break, damage tolerance, Grade for structural aerospace parts</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/32/67/ROHACELL_RIMA_2022_April_EN_243267.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
          },
        
        RIMA71HT: {
            name: "Rohacell 71 Rima-HT",
            density: 75,
            compressiveStrength: 246,
            tensileStrength: 319,
            shearStrength: 188,
            thermoformingTemp: 205,
            elongationAtBreak: 7,
            maxCuringTemperature: 180,
            description: "Aircraft, space, automotive, sport, industrial <br><br><i>High temperature and compressive resistance, highest elongation at break, damage tolerance, Grade for structural aerospace parts</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/32/67/ROHACELL_RIMA_2022_April_EN_243267.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
          },
        
        RIMA110HT: {
            name: "Rohacell 110 Rima-HT",
            density: 110,
            compressiveStrength: 522,
            tensileStrength: 536,
            shearStrength: 348,
            thermoformingTemp: 195,
            elongationAtBreak: 7,
            maxCuringTemperature: 180,
            description: "Aircraft, space, automotive, sport, industrial <br><br><i>High temperature and compressive resistance, highest elongation at break, damage tolerance, Grade for structural aerospace parts</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/32/67/ROHACELL_RIMA_2022_April_EN_243267.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
          },
           XT71: {
            name: "Rohacell 71 XT",
            density: 75,
            compressiveStrength: 246,
            tensileStrength: 319,
            shearStrength: 203,
            thermoformingTemp: 225,
            elongationAtBreak: 4,
            maxCuringTemperature: 180,
           description: "Aircraft, space, automotive, industrial <br><br><i>Highest temperature and compressive resistance, coarse cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/06/ROHACELL_XT_2022_April_EN_243306.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
           XT110: {
            name: "Rohacell 110 XT",
            density: 110,
            compressiveStrength: 522,
            tensileStrength: 536,
            shearStrength: 304,
            thermoformingTemp: 215,
            elongationAtBreak: 4,
            maxCuringTemperature: 180,
           description: "Aircraft, space, automotive, industrial <br><br><i>Highest temperature and compressive resistance, coarse cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/06/ROHACELL_XT_2022_April_EN_243306.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
              XT71HT: {
            name: "Rohacell 71 XT-HT",
            density: 75,
            compressiveStrength: 246,
            tensileStrength: 319,
            shearStrength: 203,
            thermoformingTemp: 225,
            elongationAtBreak: 4,
            maxCuringTemperature: 190,
           description: "Aircraft, space, automotive, industrial <br><br><i>Highest temperature and compressive resistance, coarse cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/06/ROHACELL_XT_2022_April_EN_243306.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
           XT110HT: {
            name: "Rohacell 110 XT-HT",
            density: 110,
            compressiveStrength: 522,
            tensileStrength: 536,
            shearStrength: 304,
            thermoformingTemp: 215,
            elongationAtBreak: 4,
            maxCuringTemperature: 190,
           description: "Aircraft, space, automotive, industrial <br><br><i>Highest temperature and compressive resistance, coarse cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/06/ROHACELL_XT_2022_April_EN_243306.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
           HF31: {
            name: "Rohacell 31 HF",
            density: 32,
            compressiveStrength: 58,
            tensileStrength: 145,
            shearStrength: 58, 
            thermoformingTemp: 0,
            elongationAtBreak: 3.5,
            maxCuringTemperature: 130,
           description: "Aircraft, space, automotive, industrial <br><br><i>Best dielectric performance, fine cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/32/98/ROHACELL_HF_2022_April_EN_243298.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
           HF51: {
            name: "Rohacell 51 HF",
            density: 52,
            compressiveStrength: 130,
            tensileStrength: 275,
            shearStrength: 116, 
            thermoformingTemp: 0,
            elongationAtBreak: 4,
            maxCuringTemperature: 130,
           description: "Aircraft, space, automotive, industrial <br><br><i>Best dielectric performance, fine cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/32/98/ROHACELL_HF_2022_April_EN_243298.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
            HF71: {
            name: "Rohacell 71 HF",
            density: 75,
            compressiveStrength: 217,
            tensileStrength: 406,
            shearStrength: 188, 
            thermoformingTemp: 0,
            elongationAtBreak: 4.5,
            maxCuringTemperature: 130,
           description: "Aircraft, space, automotive, industrial <br><br><i>Best dielectric performance, fine cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/32/98/ROHACELL_HF_2022_April_EN_243298.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
          SW60: {
            name: "Rohacryl 60 SW",
            density: 60,
            compressiveStrength: 115,
            tensileStrength: 230,
            shearStrength: 110,
            thermoformingTemp: 0,
            description: "Wind energy, sports equipment, lifestyle, marine, automotives and sub-sea<BR><BR><I>High thermal stability, superior fatigue behavior</br></I>",  },
         SW80: {
            name: "Rohacryl 80 SW",
            density: 80,
            compressiveStrength: 200,
            tensileStrength: 320,
            shearStrength: 175,
            thermoformingTemp: 0,
            description: "Wind energy, sports equipment, lifestyle, marine, automotives and sub-sea<BR><BR><I>High thermal stability, superior fatigue behavior</br></I>",  },
         SW100: {
            name: "Rohacryl 100 SW",
            density: 100,
            compressiveStrength: 290,
            tensileStrength: 405,
            shearStrength: 245,
            thermoformingTemp: 0,
            description: "Wind energy, sports equipment, lifestyle, marine, automotives and sub-sea<BR><BR><I>High thermal stability, superior fatigue behavior</br></I>",  },
         Crunchie: {
            name: "Crunchie Bar",
            density: 348,
            compressiveStrength: 0.45,
            tensileStrength: 0.09,
            shearStrength: 0.05,
            thermoformingTemp: 27, 
            description: "Tastes better than PMI foam but it's only a good core material for chocolate. <br><br>Known as 'sponge toffee' in Canada and 'honeycomb or cinder toffee' in the UK as well as 'hokey pokey' in New Zealand",  }, 
          Popcorn: {
            name: "Popcorn",
            density: 30,
            thermoformingTemp: 180,
            description: "<i>Perfect addition to a good movie<br><br>Fun Facts - Popcorn is over 50 years old, Microwaveable popcorn was invented by Pillsbury in 1982 and Nebraska produces the most popcorn in America, around 250 million pounds per year.",  },
        
        ///////////// competition grades, these grades wont switch Emkay brands stay to the left
          airexT9260: {
            name: "AIREX® T92-60",
            density: 65,
            compressiveStrength: 123.28,
            tensileStrength: 217.55,
            shearStrength: 79.77,
            thermoformingTemp: 0,
            description: "AIREX® T92 is a high-performance foam core with excellent properties.",
          },
          airexT9280: {
            name: "AIREX® T92-80",
            density: 85,
            compressiveStrength: 188.54,
            tensileStrength: 275.57,
            shearStrength: 104.42,
            thermoformingTemp: 0,
            description: "AIREX® T92 is a high-performance foam core with excellent properties.",
          },
          airexT92100: {
            name: "AIREX® T92-100",
            density: 100,
            compressiveStrength: 253,
            tensileStrength: 333,
            shearStrength: 130,
            thermoformingTemp: 0,
            description: "AIREX® T92 is a high-performance foam core with excellent properties.",
          },
          airexT92130: {
            name: "AIREX® T92-130",
            density: 135,
            compressiveStrength: 348,
            tensileStrength: 377,
            shearStrength: 188,
            thermoformingTemp: 0,
            description: "AIREX® T92 is a high-performance foam core with excellent properties.",
          },
          airexT92200: {
            name: "AIREX® T92-200",
            density: 210,
            compressiveStrength: 551,
            tensileStrength: 449,
            shearStrength: 290,
            thermoformingTemp: 0,
            description: "AIREX® T92 is a high-performance foam core with excellent properties.",
          },
          airexT9320: {
            name: "AIREX® T92-320",
            density: 320,
            compressiveStrength: 1029,
            tensileStrength: 652,
            shearStrength: 507,
            thermoformingTemp: 0,
            description: "AIREX® T92 is a high-performance foam core with excellent properties.",
          },
          airexT10: {
            name: "AIREX® T10",
            density: 65,
            compressiveStrength: 120,
            tensileStrength: 200,
            shearStrength: 90,
            thermoformingTemp: 160,
            description: "Description for AIREX® T10.",
          },
          airexR82: {
            name: "AIREX® R82",
            density: 65,
            compressiveStrength: 120,
            tensileStrength: 200,
            shearStrength: 90,
            thermoformingTemp: 160,
            description: "Description for AIREX® R82.",
          },
          airexTegraCore: {
            name: "AIREX® TegraCore™",
            density: 65,
            compressiveStrength: 120,
            tensileStrength: 200,
            shearStrength: 90,
            thermoformingTemp: 160,
            description: "Description for AIREX® TegraCore™.",
          },
          airexT90: {
            name: "AIREX® T90",
            density: 65,
            compressiveStrength: 120,
            tensileStrength: 200,
            shearStrength: 90,
            thermoformingTemp: 160,
            description: "Description for AIREX® T90.",
          },
           airexC7040: {
            name: "AIREX® C70.40",
            density: 40,
            compressiveStrength: 65.26,
            tensileStrength: 101.52,
            shearStrength: 65.26,
            thermoformingTemp: 160,
            description: "Description for AIREX® C70.40.",
          },
           airexC7048: {
            name: "AIREX® C70.48",
            density: 48,
            compressiveStrength: 87.02,
            tensileStrength: 137.78,
            shearStrength: 79.77,
            thermoformingTemp: 0,
            description: "Description for AIREX® C70.48.",
          },
          airexC7055: {
            name: "AIREX® C70.55",
            density: 60,
            compressiveStrength: 130,
            tensileStrength: 188,
            shearStrength: 123,
            thermoformingTemp: 0,
            description: "Description for AIREX® C70.55.",
          },
          airexC70: {
            name: "AIREX® C70.75",
            density: 80,
            compressiveStrength: 210,
            tensileStrength: 290,
            shearStrength: 174,
            thermoformingTemp: 0,
            description: "Description for AIREX® C70.75.",
          },
          airexC7090: {
            name: "AIREX® C70.90",
            density: 100,
            compressiveStrength: 290,
            tensileStrength: 391,
            shearStrength: 246,
            thermoformingTemp: 0,
            description: "Description for AIREX® C70.90.",
          },
          airexC70130: {
            name: "AIREX® C70.130",
            density: 130,
            compressiveStrength: 435,
            tensileStrength: 580,
            shearStrength: 348,
            thermoformingTemp: 0,
            description: "Description for AIREX® C70.130.",
          },
          airexC70200: {
            name: "AIREX® C70.200",
            density: 200,
            compressiveStrength: 754,
            tensileStrength: 870,
            shearStrength: 507,
            thermoformingTemp: 0,
            description: "Description for AIREX® C70.200.",
          },
          airexC70250: {
            name: "AIREX® C70-250",
            density: 250,
            compressiveStrength: 957,
            tensileStrength: 1087,
            shearStrength: 681,
            thermoformingTemp: 0,
            description: "Description for AIREX® C70.250.",
          },
          airexPXc: {
            name: "AIREX® PXc",
            density: 65,
            compressiveStrength: 120,
            tensileStrength: 200,
            shearStrength: 90,
            thermoformingTemp: 160,
            description: "Description for AIREX® PXc.",
          },
          airexPXw: {
            name: "AIREX® PXw",
            density: 65,
            compressiveStrength: 120,
            tensileStrength: 200,
            shearStrength: 90,
            thermoformingTemp: 160,
            elongationAtBreak: 0,
            maxCuringTemperature: 0,
            description: "Description for AIREX® PXw.",
          },
          M60: {
            name: "Corecell M60",
            density: 65,
            compressiveStrength: 80,
            tensileStrength: 118,
            shearStrength: 98,
            thermoformingTemp: 120,
           description: "Aircraft, space, automotive, industrial <br><br><i>Highest temperature and compressive resistance, medium cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/86/ROHACELL_RIST_HT_2022_April_EN_243386.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
        
           M80: {
            name: "Corecell M80",
            density: 85,
            compressiveStrength: 148,
            tensileStrength: 234,
            shearStrength: 158,
            thermoformingTemp: 120,
           description: "Aircraft, space, automotive, industrial <br><br><i>Highest temperature and compressive resistance, medium cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/86/ROHACELL_RIST_HT_2022_April_EN_243386.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
        
           M100: {
            name: "Corecell M100",
            density: 107.5,
            compressiveStrength: 225,
            tensileStrength: 306,
            shearStrength: 211,
            thermoformingTemp: 120,
           description: "Aircraft, space, automotive, industrial <br><br><i>Highest temperature and compressive resistance, medium cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/86/ROHACELL_RIST_HT_2022_April_EN_243386.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
           M130: {
            name: "Corecell M130",
            density: 140,
            compressiveStrength: 336,
            tensileStrength: 414,
            shearStrength: 287,
            thermoformingTemp: 120,
           description: "Aircraft, space, automotive, industrial <br><br><i>Highest temperature and compressive resistance, medium cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/86/ROHACELL_RIST_HT_2022_April_EN_243386.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
           },
           M200: {
            name: "Corecell M200",
            density: 200,
            compressiveStrength: 638,
            tensileStrength: 622,
            shearStrength: 428,
            thermoformingTemp: 120,
           description: "Aircraft, space, automotive, industrial <br><br><i>Highest temperature and compressive resistance, medium cells</i></b><BR><BR>Datasheet <a href='https://products.evonik.com/assets/33/86/ROHACELL_RIST_HT_2022_April_EN_243386.pdf' target='_blank'><img src='/logo/DL%20TDS.png' alt='Datasheet Download'></a>",  
          },
           BALSA: {
            name: "End Grain Balsa Core",
            density: 150,
            compressiveStrength: 1850,
            tensileStrength: 1850,
            shearStrength: 432,
           description: "Recreation equipment such as skis, snowboards, kiteboards and wakeboards. Marine hulls, decks, hatches and floors. Motorsport body panels, floors and splitters",
           }
    };
      return(map);
}          