import { Card } from '@/components/ui/card';
import React, { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption
} from "@/components/ui/table";
import { useDispatch, useSelector } from 'react-redux';
import { setBlog } from '@/redux/blogSlice';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import API from "@/api/api"; // ✅ centralized API import

const YourBlog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blog } = useSelector(store => store.blog);

    // Fetch user's own blogs
    const getOwnBlog = async () => {
        try {
            const res = await API.get('/blog/get-own-blogs');
            if (res.data.success) {
                dispatch(setBlog(res.data.blogs));
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch blogs");
        }
    };

    // Delete blog
    const deleteBlog = async (id) => {
        try {
            const res = await API.delete(`/blog/delete/${id}`);
            if (res.data.success) {
                const updatedBlogData = blog.filter((blogItem) => blogItem._id !== id);
                dispatch(setBlog(updatedBlogData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete blog");
        }
    };

    useEffect(() => {
        getOwnBlog();
    }, []);

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
    };

    return (
        <div className='pb-10 pt-20 md:ml-[320px] h-screen'>
            <div className='max-w-6xl mx-auto mt-8'>
                <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
                    <Table>
                        <TableCaption>Your recent blogs</TableCaption>
                        <TableHeader className="overflow-x-auto">
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-x-auto">
                            {blog?.map((item, index) => (
                                <TableRow key={item._id}>
                                    <TableCell className="flex gap-4 items-center">
                                        <img src={item.thumbnail} alt="" className='w-20 rounded-md hidden md:block' />
                                        <h1
                                            className='hover:underline cursor-pointer'
                                            onClick={() => navigate(`/blogs/${item._id}`)}
                                        >
                                            {item.title}
                                        </h1>
                                    </TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                                    <TableCell className="text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><BsThreeDotsVertical /></DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-[180px]">
                                                <DropdownMenuItem onClick={() => navigate(`/dashboard/write-blog/${item._id}`)}>
                                                    <Edit /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-500"
                                                    onClick={() => deleteBlog(item._id)}
                                                >
                                                    <Trash2 /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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

export default YourBlog;
