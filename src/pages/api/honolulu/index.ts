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

type HonoluluData = {
  academies: Academy[];
  classes: Class[];
};

type AcademyWithClasses = Academy & {
  classes: Class[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // データファイルのパスを取得
      const dataFilePath = path.join(process.cwd(), 'data', 'honolulu_bjj_data.json');
      
      // ファイルが存在するか確認
      if (!fs.existsSync(dataFilePath)) {
        return res.status(404).json({ error: 'Honolulu BJJ data not found' });
      }
      
      // データファイルを読み込む
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      const honoluluData: HonoluluData = JSON.parse(fileData);
      
      // クエリパラメータを取得
      const { academy_name, class_type, day_of_week } = req.query;
      
      // アカデミーのフィルタリング
      let filteredAcademies = honoluluData.academies;
      if (academy_name) {
        const searchTerm = String(academy_name).toLowerCase();
        filteredAcademies = filteredAcademies.filter(academy => 
          academy.name.toLowerCase().includes(searchTerm)
        );
      }
      
      // クラスのフィルタリング
      let filteredClasses = honoluluData.classes;
      if (class_type) {
        filteredClasses = filteredClasses.filter(cls => 
          cls.class_type === class_type
        );
      }
      
      if (day_of_week) {
        filteredClasses = filteredClasses.filter(cls => 
          cls.day_of_week.toLowerCase() === String(day_of_week).toLowerCase()
        );
      }
      
      // アカデミーごとにクラスをグループ化
      const academiesWithClasses: AcademyWithClasses[] = filteredAcademies.map(academy => {
        const academyClasses = filteredClasses.filter(cls => cls.academy === academy.name);
        return {
          ...academy,
          classes: academyClasses
        };
      });
      
      // 結果を返す
      return res.status(200).json({
        academies: academiesWithClasses
      });
    } catch (error) {
      console.error('Error fetching Honolulu BJJ data:', error);
      return res.status(500).json({ error: 'Failed to fetch Honolulu BJJ data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}