import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import API from "@/api/api"; // ✅ centralized API import
import { toast } from 'sonner';

const Comments = () => {
    const [allComments, setAllComments] = useState([]);
    const navigate = useNavigate();

    
    const getTotalComments = async () => {
        try {
            const res = await API.get('/comment/my-blogs/comments');
            if (res.data.success) {
                setAllComments(res.data.comments);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch comments");
        }
    };

    useEffect(() => {
        getTotalComments();
    }, []);

    return (
        <div className='pb-10 pt-20 md:ml-[320px] h-screen'>
            <div className='max-w-6xl mx-auto mt-8'>
                <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
                    <Table>
                        <TableCaption>A list of your recent comments.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Blog Title</TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allComments?.map((comment, index) => (
                                <TableRow key={index}>
                                    <TableCell className="flex gap-4 items-center">
                                        {comment.postId.title}
                                    </TableCell>
                                    <TableCell>{comment.content}</TableCell>
                                    <TableCell>{comment.userId.firstName}</TableCell>
                                    <TableCell className="text-center flex gap-3 items-center justify-center">
                                        <Eye
                                            className='cursor-pointer'
                                            onClick={() => navigate(`/blogs/${comment.postId._id}`)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default Comments;
