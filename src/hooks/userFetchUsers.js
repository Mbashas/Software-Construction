import { useState, useEffect, useCallback } from "react";
import { fetchUsers } from "../services/userService";

/*
 * Observer Pattern Implementation:
 * - The hook acts as a Subject (Observable) maintaining state
 * - Components using this hook are Observers that get notified of state changes
 * - useState hooks serve as the subscription mechanism
 * - Components automatically re-render (notify) when state changes
 */

export default function useFetchUsers() {
  // State observers that notify subscribers (components) of changes
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Notify observers about state changes in a consistent way
  const notifyStateChange = useCallback((data, error = null) => {
    if (error) {
      setError(error);
      setUsers([]);
    } else {
      setError("");
      setUsers(data);
    }
    setLoading(false);
  }, []);

  // Initialize subscription to data
  useEffect(() => {
    let isSubscribed = true; // Subscription flag

    const fetchData = async () => {
      try {
        const data = await fetchUsers();
        // Only notify if still subscribed
        if (isSubscribed) {
          notifyStateChange(data);
        }
      } catch (err) {
        // Only notify if still subscribed
        if (isSubscribed) {
          notifyStateChange([], "Error fetching users");
        }
      }
    };

    fetchData();

    // Cleanup subscription
    return () => {
      isSubscribed = false;
    };
  }, [notifyStateChange]);

  return { users, loading, error, setUsers };
}