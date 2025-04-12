import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type Academy = {
  name: string;
  website: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  logo_url: string;
  social_media: Record<string, string>;
  location: {
    latitude: number;
    longitude: number;
  };
  classes: Class[];
};

type Class = {
  academy: string;
  name: string;
  description: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  class_type: string;
  instructor: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // データファイルのパスを取得
      const dataFilePath = path.join(process.cwd(), 'data', 'tokyo_bjj_data.json');
      
      // ファイルが存在するか確認
      if (!fs.existsSync(dataFilePath)) {
        return res.status(404).json({ error: 'Tokyo BJJ data not found' });
      }
      
      // データファイルを読み込む
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      const tokyoData = JSON.parse(fileData);
      
      // クエリパラメータを取得
      const { academy_name, class_type, day_of_week } = req.query;
      
      // アカデミーのフィルタリング
      let filteredAcademies = tokyoData.academies;
      if (academy_name) {
        const searchTerm = String(academy_name).toLowerCase();
        filteredAcademies = filteredAcademies.filter((academy: Academy) => 
          academy.name.toLowerCase().includes(searchTerm)
        );
      }
      
      // クラスのフィルタリング
      let filteredAcademiesWithClasses = filteredAcademies.map((academy: Academy) => {
        let filteredClasses = academy.classes;
        
        if (class_type) {
          filteredClasses = filteredClasses.filter((cls: Class) => 
            cls.class_type === class_type
          );
        }
        
        if (day_of_week) {
          const dayOfWeekLower = String(day_of_week).toLowerCase();
          filteredClasses = filteredClasses.filter((cls: Class) => {
            // day_of_weekフィールドが存在する場合はそれを使用
            if (cls.day_of_week) {
              return cls.day_of_week.toLowerCase() === dayOfWeekLower;
            }
            // dayフィールドが存在する場合はそれを使用（互換性のため）
            if ('day' in cls) {
              return (cls as any).day.toLowerCase() === dayOfWeekLower;
            }
            return false;
          });
        }
        
        return {
          ...academy,
          classes: filteredClasses
        };
      });
      
      // 結果を返す
      return res.status(200).json({
        academies: filteredAcademiesWithClasses
      });
    } catch (error) {
      console.error('Error fetching Tokyo BJJ data:', error);
      return res.status(500).json({ error: 'Failed to fetch Tokyo BJJ data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}