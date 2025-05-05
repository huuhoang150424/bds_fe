import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, X, Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useUpdateUser } from '../hooks/use-update-user';
import { toast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';

interface UpdateProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userSelect: any;
}

export default function UpdateProfileModal({ open, onOpenChange, userSelect }: UpdateProfileModalProps) {
  const user = useSelector(selectUser);
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [certificatePreview, setCertificatePreview] = useState<string | null>(userSelect?.certificates || null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(userSelect?.avatar || null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(userSelect?.coverPhoto || null);
  const [removedAvatarUrl, setRemovedAvatarUrl] = useState<string | null>(null);
  const [removedCoverPhotoUrl, setRemovedCoverPhotoUrl] = useState<string | null>(null);
  const [removedCertificateUrl, setRemovedCertificateUrl] = useState<string | null>(null);
  const [expertises, setExpertises] = useState<string[]>(() => userSelect?.expertise?.map((exp: string) => exp));


  const formSchema = z.object({
    fullname: z.string().min(1, 'Họ và tên là bắt buộc'),
    email: z.string().email('Email không hợp lệ').min(1, 'Email là bắt buộc'),
    phone: z.string().optional(),
    address: z.string().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    dateOfBirth: z.string().optional(),
    selfIntroduction: z.string().optional(),
    experienceYears: z.string().optional(),
    expertise: z.string().optional(),
  }).superRefine((data, ctx) => {
    if (user?.roles === 'Agent') {
      if (!data.selfIntroduction) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Giới thiệu bản thân là bắt buộc cho Agent',
          path: ['selfIntroduction'],
        });
      }
      if (!data.experienceYears) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Số năm kinh nghiệm là bắt buộc cho Agent',
          path: ['experienceYears'],
        });
      }
      if (!certificateFile && !certificatePreview) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Cần một chứng chỉ cho Agent',
          path: ['certificates'],
        });
      }
      if (!expertises.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Cần ít nhất một chuyên môn cho Agent',
          path: ['expertise'],
        });
      }
    }
  });
  const isAgent = user?.roles === 'Agent';
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: userSelect.fullname || '',
      email: userSelect.email || '',
      phone: userSelect.phone || '',
      address: userSelect.address || '',
      gender: userSelect.gender || 'Other',
      dateOfBirth: userSelect.dateOfBirth ? format(new Date(userSelect.dateOfBirth), 'yyyy-MM-dd') : '',
      selfIntroduction: userSelect.selfIntroduction || '',
      experienceYears: userSelect.experienceYears || '',
      expertise: '',
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        fullname: userSelect.fullname || '',
        email: userSelect.email || '',
        phone: userSelect.phone || '',
        address: userSelect.address || '',
        gender: userSelect.gender || 'Other',
        dateOfBirth: userSelect.dateOfBirth ? format(new Date(userSelect.dateOfBirth), 'yyyy-MM-dd') : '',
        selfIntroduction: userSelect.selfIntroduction || '',
        experienceYears: userSelect.experienceYears || '',
        expertise: '',
      });
      setAvatarFile(null);
      setCoverPhotoFile(null);
      setCertificateFile(null);
      setCertificatePreview(userSelect.certificates || null);
      setAvatarPreview(userSelect.avatar || null);
      setCoverPhotoPreview(userSelect.coverPhoto || null);
      setRemovedAvatarUrl(null);
      setRemovedCoverPhotoUrl(null);
      setRemovedCertificateUrl(null);
    }
  }, [open, userSelect, form]);

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setRemovedAvatarUrl(null);
    }
  }, []);

  const handleCoverPhotoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhotoFile(file);
      setCoverPhotoPreview(URL.createObjectURL(file));
      setRemovedCoverPhotoUrl(null);
    }
  }, []);

  const handleCertificateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificateFile(file);
      setCertificatePreview(URL.createObjectURL(file));
      setRemovedCertificateUrl(null);
    }
  }, []);

  const handleRemoveCertificate = useCallback(() => {
    setCertificateFile(null);
    setCertificatePreview(null);
    setRemovedCertificateUrl(userSelect.certificates || null);
  }, [userSelect.certificates]);

  const handleRemoveAvatar = useCallback(() => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setRemovedAvatarUrl(userSelect.avatar || null);
  }, [userSelect.avatar]);

  const handleRemoveCoverPhoto = useCallback(() => {
    setCoverPhotoFile(null);
    setCoverPhotoPreview(null);
    setRemovedCoverPhotoUrl(userSelect.coverPhoto || null);
  }, [userSelect.coverPhoto]);

  const handleAddExpertise = useCallback(() => {
    const expertise = form.getValues('expertise');
    if (expertise && !expertises.includes(expertise)) {
      setExpertises((prev) => [...prev, expertise]);
      form.setValue('expertise', '');
    }
  }, [form, expertises]);

  const handleRemoveExpertise = useCallback((index: number) => {
    setExpertises((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const data = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'expertise') {
        data.append(key, JSON.stringify(expertises));
      } else if (value) {
        data.append(key, value);
      }
    });

    data.append('roles', userSelect.roles);

    if (avatarFile) {
      data.append('avatar', avatarFile);
    }
    if (coverPhotoFile) {
      data.append('coverPhoto', coverPhotoFile);
    }
    if (certificateFile) {
      data.append('certificates', certificateFile);
    }

    if (removedAvatarUrl) {
      data.append('removedAvatarUrl', removedAvatarUrl);
    }
    if (removedCoverPhotoUrl) {
      data.append('removedCoverPhotoUrl', removedCoverPhotoUrl);
    }
    if (removedCertificateUrl) {
      data.append('removedCertificateUrl', removedCertificateUrl);
    }

    updateUser(
      { userId: user?.id || '', formData: data },
      {
        onSuccess: () => {
          toast({
            title: 'Cập nhật thành công',
            description: 'Thông tin hồ sơ đã được cập nhật.',
          });
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast({
            title: 'Lỗi',
            description: error.message || 'Đã có lỗi xảy ra khi cập nhật hồ sơ.',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Avatar */}
              <div className="space-y-2">
                <FormLabel>Ảnh đại diện</FormLabel>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={avatarPreview || '/placeholder.svg?height=64&width=64'} alt="Avatar" />
                    <AvatarFallback>{form.getValues('fullname')?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('avatar')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Tải lên
                    </Button>
                    <input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                    {avatarPreview && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveAvatar}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Xóa ảnh
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Cover Photo */}
              <div className="space-y-2">
                <FormLabel>Ảnh bìa</FormLabel>
                <div className="flex items-center gap-4">
                  <img
                    src={coverPhotoPreview || '/placeholder.svg?height=100&width=200'}
                    alt="Cover"
                    className="h-24 w-48 object-cover rounded-md"
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('coverPhoto')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Tải lên
                    </Button>
                    <input
                      id="coverPhoto"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverPhotoChange}
                    />
                    {coverPhotoPreview && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveCoverPhoto}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Xóa ảnh
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Fullname */}
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-[8px] outline-none px-[12px] py-[8px] text-gray-700" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} className="rounded-[8px] outline-none px-[12px] py-[8px] text-gray-700" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-[8px] outline-none px-[12px] py-[8px] text-gray-700" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-[8px] outline-none px-[12px] py-[8px] text-gray-700" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[9999]">
                        <SelectItem value="Male">Nam</SelectItem>
                        <SelectItem value="Female">Nữ</SelectItem>
                        <SelectItem value="Other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày sinh</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input type="date" {...field} className="rounded-[8px] outline-none px-[12px] py-[8px] text-gray-700" />
                      </FormControl>
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Agent-specific fields */}
              {isAgent && (
                <>
                  <FormField
                    control={form.control}
                    name="selfIntroduction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giới thiệu bản thân</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="rounded-[8px] outline-none px-[12px] py-[8px] text-gray-700" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Experience Years */}
                  <FormField
                    control={form.control}
                    name="experienceYears"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số năm kinh nghiệm</FormLabel>
                        <FormControl>
                          <Input {...field} className="rounded-[8px] outline-none px-[12px] py-[8px] text-gray-700" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Certificate */}
                  <FormItem>
                    <FormLabel>Chứng chỉ</FormLabel>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <img
                          src={certificatePreview || '/placeholder.svg?height=100&width=200'}
                          alt="Certificate"
                          className="h-24 w-48 object-cover rounded-md"
                        />
                        <div className="flex flex-col gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('certificate')?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Tải lên
                          </Button>
                          <input
                            id="certificate"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCertificateChange}
                          />
                          {certificatePreview && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={handleRemoveCertificate}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Xóa ảnh
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>

                  {/* Expertise */}
                  <FormItem>
                    <FormLabel>Chuyên môn</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          {...form.register('expertise')}
                          placeholder="Nhập chuyên môn"
                          className="rounded-[8px] outline-none px-[12px] py-[8px] text-gray-700"
                        />
                      </FormControl>
                      <Button type="button" onClick={handleAddExpertise} variant="outline">
                        Thêm
                      </Button>
                    </div>
                    <div className="mt-2 space-y-2">
                      {expertises.map((exp, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                          <span>{exp}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveExpertise(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button
                variant="outline"
                className="bg-red-500 hover:bg-red-600 text-white"
                type="submit"
                disabled={isPending}
              >
                {isPending ? 'Đang cập nhật...' : 'Lưu'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}