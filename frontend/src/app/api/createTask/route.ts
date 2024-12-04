export const POST = async (request: Request) => {
    try {
      const { title, description, dueDate, priority } = await request.json(); // Extract task details including priority
      const userEmail = request.headers.get('user-email');
      if (!userEmail) {
        return new Response(JSON.stringify({ message: 'User email is required' }), {
          status: 400,
        });
      }
  
      // Call the backend Express API to create a new task
      const response = await fetch('http://localhost:4000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-email': userEmail,
        },
        body: JSON.stringify({ title, description, dueDate, priority }), // Include priority in the request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  };