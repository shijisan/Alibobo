import { supabase } from '@/utils/supabase';

export default async function Notes() {
  // Fetch notes directly in the component
  const { data: notes, error } = await supabase.from('notes').select();

  // Debugging output
  console.log('Fetched notes:', notes);
  console.error('Fetch error:', error);

  if (error) {
    return (
      <div>
        <h1>Error fetching notes</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Notes</h1>
      {notes.length > 0 ? (
        <pre>{JSON.stringify(notes, null, 2)}</pre>
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
}
