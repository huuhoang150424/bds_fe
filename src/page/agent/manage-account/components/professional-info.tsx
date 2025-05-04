import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { BriefcaseIcon, BookOpenIcon, AwardIcon } from 'lucide-react';

interface ProfessionalInfoProps {
  user: any;
}

export default function ProfessionalInfo({ user }: ProfessionalInfoProps) {
  const expertiseArray = user.expertise
    ? Array.isArray(user.expertise)
      ? user.expertise
      : [user.expertise]
    : [];

  return (
    <Card className="border shadow-sm border border-gray-200 rounded-[8px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <BriefcaseIcon className="h-4 w-4" />
          </div>
          Thông tin chuyên môn
        </CardTitle>
        <CardDescription className="text-xs">Chi tiết về kinh nghiệm và chuyên môn của bạn</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 grid gap-6">
        <div className="space-y-1.5">
          <Label className="text-xs text-gray-500 flex items-center gap-1.5">
            <BookOpenIcon className="h-3 w-3 text-gray-400" />
            Giới thiệu chuyên môn
          </Label>
          <div className="font-medium text-sm p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
            {user.selfIntroduction || 'Chưa có thông tin giới thiệu chuyên môn'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <Label className="text-xs text-gray-500 flex items-center gap-1.5">
              <BriefcaseIcon className="h-3 w-3 text-gray-400" />
              Số năm kinh nghiệm
            </Label>
            <div className="font-medium text-sm flex items-center">
              <span className="font-bold mr-1">{user.experienceYears || 0}</span>
              <span>năm</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: `${Math.min(Number.parseInt(user.experienceYears || '0') * 10, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <Label className="text-xs text-gray-500 flex items-center gap-1.5">
              <AwardIcon className="h-3 w-3 text-gray-400" />
              Trạng thái chuyên gia
            </Label>
            <div className="font-medium text-sm">
              {user.isProfessional ? (
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Đã xác nhận
                  </span>
                  <span className="ml-2 text-xs text-gray-500">Ngày 15/04/2023</span>
                </div>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 9V13M12 17H12.01M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Chưa xác nhận
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-gray-500 flex items-center gap-1.5">
            <svg className="h-3 w-3 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15L8.5 10L15.5 10L12 15Z" fill="currentColor" />
              <path
                d="M9 6H15M12 3V6M7.8 7.8L9.5 9.5M16.2 7.8L14.5 9.5M7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Chứng chỉ
          </Label>
          <div className="font-medium text-sm">
            {user.certificates ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(user.certificates.split(',') || []).map((cert: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30"
                  >
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15L8.5 10L15.5 10L12 15Z" fill="currentColor" />
                        <path
                          d="M9 6H15M12 3V6M7.8 7.8L9.5 9.5M16.2 7.8L14.5 9.5M7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-xs text-gray-800 dark:text-gray-200">{cert.trim() || 'Không xác định'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-xs p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-center">
                Chưa có chứng chỉ nào
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-gray-500">Lĩnh vực chuyên môn</Label>
          <div className="flex flex-wrap gap-1.5">
            {expertiseArray.length > 0 ? (
              expertiseArray.map((exp: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/30"
                >
                  <svg className="h-2.5 w-2.5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 12H15M12 9V15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {exp}
                </span>
              ))
            ) : (
              <div className="text-gray-500 text-xs p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-center w-full">
                Chưa có lĩnh vực chuyên môn nào
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}